# Code Review — cc-safety-next

> A detached OpenCode fork of CC Safety Net (`@local/cc-safety-net`), version 2.4.14.
> It blocks destructive commands and access to secrets (SSH keys, `.env`, agent credentials,
> the policy files themselves) before a tool call runs, by statically parsing the command.

- Review date: 2026-07-11
- Scope: entire repository (`src/`, `tests/`, `scripts/`, root config)
- Method: source reading across all modules, plus **dynamic reproduction** of the most
  security-relevant findings against the real code on the current machine (Windows, Bun 1.4.2,
  Node 24), using the same harness the unit tests use.
- Verdict: a well-architected, unusually well-tested tool with a strong fail-closed core, but
  the **guard layer that protects secrets and the policy files has a cluster of confirmed
  bypasses**, and the enforcement/CI layer described in `AGENTS.md` no longer exists.

Findings are ranked Critical → Low. Findings marked **Verified** were reproduced by running the
real functions and are shown with their exact output in [Appendix A](#appendix-a-verified-repros).

---

## 1. What the project is

`cc-safety-net` inspects a coding agent's intended tool call (a shell command, a file write,
etc.) and returns *allow* or *deny* with a reason, before the tool runs. The core promise
(README):

- Blocks recognizable destructive Git/filesystem commands (`rm -rf`, `git reset --hard`,
  `git push --force`, …) and access to secrets.
- Parses the command structurally, so wrappers and reordered flags do not hide intent.
- **Fail-closed**: an unparseable, structurally-limited, or crashing analysis becomes a denial,
  and "a broken config file never blocks anything" (i.e. a broken *policy* falls back to safe
  defaults rather than crashing the guard).

It ships as an OpenCode plugin, a CLI (`status`, `doctor`, `explain`, `logs`, `rule`, `policy`,
`gui`), a local web policy editor, and a small library API (`checkCommand`).

### Architecture (layers, bottom-up)

| Layer | Location | Responsibility |
|---|---|---|
| Shell model/parser | `src/core/shell/*` | `parseCommand` → immutable frozen AST for POSIX and PowerShell dialects, heredocs, tokens. |
| Analyzer | `src/gate/analyzer/**` | Walks the AST, resolves cwd/env/wrappers, and matches destructive rules (`rm`, git, `find`, interpreters, `xargs`/`parallel`, …). |
| Guards | `src/gate/guards/*`, `src/gate/secret/*` | Independent path-mutation detectors for the policy files, git metadata, and secrets. Uses its own walker (`guard-walk.ts`). |
| Pipeline | `src/gate/pipeline.ts` | Orchestrates guards + analyzer, produces a `Decision`, each dependency wrapped fail-closed. |
| Policy | `src/core/policy/**` | Loads/merges/validates policy, safety levels, rulebooks, allow/deny paths. |
| Hosts / CLI / GUI / audit | `src/hosts`, `src/cli`, `src/gui`, `src/audit`, `src/rules-manager` | Integrations, commands, web editor, audit trail, remote rulebook sync. |

Data flow for a shell call: `intake` → `pipeline.evaluateGuard` → guards (policy-apply →
policy-protection → git-metadata → secret) → analyzer (`analyzeCommand`) → `Decision` →
`deny`/`allow`, with an audit entry and (optionally) an interactive override.

---

## 2. Critical findings

### C1. `cd` options are mis-read as the target directory → secret and policy protection bypass — **Verified**

`src/gate/guards/guard-walk.ts:286`

```ts
const target = getBasename(stripped[0] ?? '').toLowerCase() === 'cd' ? stripped[1] : undefined;
```

The guard walker takes the *second word* as the `cd` destination unconditionally; it does not
skip `-L`, `-P`, or `--`. So for `cd -P ~`, the tracked cwd becomes `<cwd>/-P` instead of the
home directory. Every later relative operand in the same command is then resolved against the
wrong directory, and the home-anchored secret rules and the policy-file identity miss it.

Reproduced (Appendix A, cases 2–4):

```
cd <home> && cat .ssh/config            => DENY  (secret.home.ssh)   # correct
cd -L <home> && cat .ssh/config         => allow                     # BYPASS
cd -P <home> && cat .ssh/config         => allow                     # BYPASS
cd -- <home> && rm -rf .cc-safety-net   => allow                     # BYPASS (policy protection)
```

`-L` and `-P` are ordinary, common `cd` flags; `cd -- ~` is idiomatic. Notably the **analyzer's
own cwd tracker gets this right** (`src/gate/analyzer/segment.ts` `resolveCwdAfterCommandView`
skips `-L/-P/--` and enforces `CDPATH`), so the two layers silently disagree.

**Impact:** an agent (or a prompt-injected command) can read `~/.ssh/id_rsa`, `~/.aws/credentials`,
etc., and can overwrite or delete `~/.cc-safety-net/policy.json` / the project policy, simply by
prefixing the command with `cd -P ~ &&` or `cd -- ~ &&`.

**Fix:** share one `cd`-parsing routine between `guard-walk.ts` and `segment.ts` (skip leading
`-L/-P/--`, honor `-` for `$OLDPWD`, expand `~`/`$HOME`). Add contract rows for `cd -L/-P/--`.

### C2. `pushd`/`popd`/bare `cd` do not update tracked cwd → same bypass — **Verified**

`src/gate/guards/guard-walk.ts:276-302` handles only a literal `cd <arg>`; `pushd`, `popd`, and
bare `cd` (which in bash goes to `$HOME`) leave the tracked cwd stale.

```
pushd <home> && cat .ssh/config   => allow   # BYPASS
```

(Bare `cd` in home is only partially masked in the repro because the project policy happens to
sit under the workspace; with any workspace-relative target the leak is real.)

**Fix:** treat `pushd <dir>` like `cd <dir>`, handle `cd`/`pushd` with no operand as `$HOME`, and
either track or conservatively reset cwd on `popd`.

### C3. Command substitution inside double quotes / backticks is not walked → policy/git bypass — **Verified**

`src/gate/guards/guard-walk.ts:587-606`

When a `command-substitution` part occurs **inside a double-quoted string**, the walker appends
the raw quoted text and only forwards masked heredoc handovers — the nested program is **never
walked**. Unquoted `$(...)` and backticks are handled correctly (lines 607-644).

```
cp /dev/null <policy.json>                  => DENY    # correct
echo "$(cp /dev/null <policy.json>)"        => allow   # BYPASS
cd <home> && echo "$(cat .ssh/config)"      => allow   # BYPASS (secret)
```

**Impact:** the policy-protection and git-metadata guards are bypassable with a quoted command
substitution. Secret protection survives *most* quoted cases only because it runs a separate
source-level scan for `$()`/backticks (`secret-protection.ts`), but the quoted-`cd` combination
above defeats it too.

**Fix:** in the `state.double` branch, descend into `nested` (as the unquoted branch does) with a
scope frame, rather than stringifying the raw text.

---

## 3. High findings

### H1. Interpreter / child invocations are not inspected by the policy and git guards — **Verified**

`policy-protection.ts` / `git-metadata-protection.ts` only walk the top-level `GuardSyntax`; they
have no descent into `bash -c`, `sh -c`, `eval`, `python3 -c`, `node -e`, `env bash -c`, etc.
(The analyzer *does* model interpreters, but the guards do not reuse that.)

```
bash -c "cp /dev/null <policy.json>"      => allow   # BYPASS
sh -c "cp /dev/null <policy.json>"        => allow   # BYPASS
eval "cp /dev/null <policy.json>"         => allow   # BYPASS
python3 -c "open('<policy.json>','w')"    => allow   # BYPASS
node -e "require('fs').writeFileSync('<policy.json>','')" => allow  # BYPASS
env bash -c "cp /dev/null <policy.json>"  => allow   # BYPASS
```

**Impact:** the same policy-file overwrite as C1, via an interpreter one-liner.
**Fix:** reuse the analyzer's interpreter unwrapping to feed decoded child commands through
`readGuardSyntax`, or route interpreter children through the same guard walk.

### H2. A repository's own project policy can silently weaken protection — design

`src/core/policy/merge.ts` (`collectWeakenings`, `mergeProjectPolicy`).

Project policy (`<repo>/.cc-safety-net/policy.json`) is auto-loaded from the workspace and merged
into the effective policy. Weakenings (disabling secret/destructive protection, adding
`allow_paths`, lowering the level) are detected but only surfaced as **diagnostics**; the gate
still applies the weakened policy. Opening an untrusted repository (or a PR that edits its
project policy) can therefore turn protections off with only an informational notice. There is
also a false "added path" when comparing `~/a` vs `~/a/` (raw string compare, `merge.ts:139`).

**Fix:** make security-relevant weakenings from project scope require explicit user opt-in, or
refuse them outright (deny-by-default for weakening), consistent with "a rulebook can only add
blocks, it cannot turn built-in protection off".

### H3. The enforcement layer described by `AGENTS.md` no longer exists

- **No CI.** `.github/` was deleted in the fork (`git show 0da2b41`). `AGENTS.md:10` still claims
  "CI rejects a stale build". `check:ci` / `lint:ci` (`package.json:49,51`) are dead scripts.
- **`bun run check` omits the checks it is advertised to run.** `package.json:48` runs
  `lint && lint:comments && format:check && typecheck && test`. It does **not** run `knip`,
  `check-duplicates` (jscpd), `verify:coverage`, or `audit:dependencies`, yet `AGENTS.md:2` says
  `check` covers "knip, duplication" and instructs agents not to run components separately.
  Net effect: knip, jscpd, the 90% coverage gate, and `bun audit` are **never** run by anything.
- **Committed `dist/` is never freshness-checked.** `scripts/verify-build.ts` validates artifact
  *shape*, never that `dist/` matches `src/`, and **no test imports `dist/`**. A stale committed
  build is undetectable.

**Fix:** restore a minimal CI workflow that runs `check` + `knip` + `check-duplicates` +
`test:coverage` + `verify:coverage`, and add a freshness check (rebuild and `git diff --exit-code dist`).

### H4. GUI install/uninstall is dead — routes do not exist — **Verified**

The frontend posts to `/api/install` and `/api/uninstall` (`src/gui/frontend/main.ts:997`), but
`handleRequest` (`src/gui/index.ts:174-405`) has no branch for either path, so both fall through
to `404 Not found` (`index.ts:404`). The "Installed / Not installed" badge flips only on success,
so the button always errors out. Related: `src/cli/doctor/findings.ts:46` tells users to run
`cc-safety-net install`, but no `install` command is registered (only status/doctor/logs/explain/
rule/policy/gui), so that hint always fails too.

**Impact:** an advertised feature is broken, and a user can believe a hook is installed when it
never was (false sense of safety). **Fix:** implement the routes (or remove the buttons), add the
`install` command, and add a route-existence test.

### H5. GUI request handler can throw → hung response + unhandled rejection

`src/gui/index.ts:152-154` fire-and-forgets `handleRequest` with `void` and no top-level
`try/catch`. `POST /api/policy/explain` → `explainCommand` can throw
`StructuralShellSyntaxLimitError` (`src/gate/explain.ts:112`) and `GuardEvaluationError`
(`src/gate/pipeline.ts:325,345`) for pathological input; the CLI path catches these
(`src/cli/explain/run.ts:33-44`) but the GUI path does not. `POST /api/policy`/`/api/repair` can
throw `PolicyFilesystemError` from the atomic writer. Result: the client hangs and the server
emits an unhandled rejection.

**Fix:** wrap the handler body in `try/catch` → `500` JSON, and mirror `runExplain`'s error
handling in `/api/policy/explain`.

### H6. GUI local server hardening gaps

`src/gui/index.ts:145-172,527-531`. The loopback server relies solely on an unguessable token:
no `Host`-header validation (DNS-rebinding), no `Content-Security-Policy` /
`X-Content-Type-Options: nosniff` / `Referrer-Policy`, and the token is delivered in the URL
query and embedded in the page (leakable via history/logs/referrer). Token comparison is `!==`
rather than constant-time. Positively, body size is capped (1 MB) and the frontend escapes all
server-derived strings (`escapeHtml`), so no XSS was found.

**Fix:** validate `Host`, add security headers, use `crypto.timingSafeEqual`, and prefer a
`SameSite` cookie / one-time header over the URL token.

---

## 4. Medium findings

### M1. `evaluateGuard` leaves one dependency call un-wrapped

`src/gate/pipeline.ts:201` calls `dependencies.getModes(policy, …)` directly, while every other
dependency is wrapped by `callDependency` so a throw becomes a failed-closed denial. A throw here
escapes the guard contract. Wrap it (and `getConfigFallback`) for consistency.
(Reported; `tests/gate/failure-injection.test.ts` should be extended to cover this call.)

### M2. `readFileSync` for the most security-sensitive read

`src/core/policy/store.ts:528-571` (`readPolicyFile`, used for the **user and project policy**)
uses plain `existsSync`/`readFileSync` with no `O_NOFOLLOW`. Every other policy read uses the
hardened `io/safe-read.ts`. Inconsistent hardening on the file that defines enforcement.
`store-gui.ts:45,121` and `policy/diff.ts:69` share the same raw reader.

### M3. Interaction channel is not redacted

`src/core/interaction/protocol.ts:63-69` writes the unredacted `denial.command`/`segment` into the
temp request file, and `hosts/opencode/tui.ts:66-72` shows it in the toast. The audit writer
redacts (`audit/writer.ts`), but the interaction channel does not. A blocked command containing an
inline secret lands on disk / on screen in the clear.

### M4. `Math.random()` for security-relevant values

`src/core/random-hex.ts` uses `Math.random()` for (a) audit entry ids (`audit/writer.ts:99`) and
(b) atomic-write temp suffixes (`io/safe-read.ts:125`). The temp write uses
`O_CREAT|O_EXCL|O_NOFOLLOW` and re-validates, so symlink overwrite is blocked, but predictable
names enable a local pre-create DoS and weaken defense-in-depth. Use `crypto.randomBytes`.

### M5. Only `policy.json` is write-protected

`rule.json` and vendored rulebook files (which define custom rules, overrides, and transparent
wrappers) are not protected against tool writes — they can re-shape enforcement.

### M6. PowerShell auto-detection misclassifies POSIX commands

`src/core/shell/powershell.ts:56-76`. `AUTO_POWERSHELL_HEADS` (lines 37-49) includes names that
are also POSIX commands — notably `rmdir` (and `del`, `rd`, `erase`). An `auto`-dialect POSIX
`rmdir …` is force-parsed as PowerShell, which flips `dialect`, skips filesystem-state isolation
(`analyze-command.ts:299`), and routes path handling through PowerShell semantics. Not a direct
bypass (both analyzers still run) but a correctness/robustness defect.

### M7. PowerShell single-quoted word scanner ignores its `end` boundary

`src/core/shell/powershell.ts:382`. The single-quote loop runs `while (i < source.length)` instead
of `while (i < end)` (the double-quote loop is correct). A `'…'` inside a `$(…)`/`{…}` can swallow
the closing token and following words, mis-scoping nested programs. Should be `i < end`.

### M8. POSIX parser issues

- `src/core/shell/posix.ts:974-997` — `&>`/`&>>` are mis-parsed as the `&` background connector
  plus a separate `>` redirect, corrupting control-flow and cwd state.
- `src/core/shell/posix.ts:1006-1014` — `${…}` end detection stops at the first `}` (no nesting/
  quoting), so `${x:-$(echo })}` etc. capture the wrong span.
- `src/core/shell/posix.ts:999-1004` — `isShellWhitespace` treats `\v`, `\f`, and Unicode
  whitespace as separators; real shells split only on `IFS`, so this can over-split words.

### M9. Analysis-limit error codes are lost; reason mismapped

`src/gate/analyzer/index.ts:16-22` `ANALYZER_CAP_KINDS` omits the PATH-kind caps, so their
specific error code is dropped; `budget.ts:14-50` also mismaps a `recursionDepth` reason.

### M10. Guard-config check ignores `CC_SAFETY_NET_HOME`

`src/core/policy/allow-paths.ts:69-73` (`coversGuardConfig`) hardcodes `join(home, '.cc-safety-net')`.
With a custom `CC_SAFETY_NET_HOME`, validation checks the wrong directory (runtime
`matchesAllowedPath` does consult it), a validation/runtime inconsistency.

### M11. Fallback diagnostics mislabel a valid user policy

`src/core/policy/store.ts:90-93` sets `fallback='salvaged'` whenever *project* errors exist even
if the *user* policy was fine, and `snapshot.ts:98-105` then prints "Enforcing the salvaged policy",
misleading the operator about enforcement state.

### M12. Build/test enforcement gaps

- `scripts/verify-build.ts:21` exports `unbundledRuntimeImports` tagged `/** @internal */` that is
  used **nowhere** — the exact anti-pattern `AGENTS.md:64-70` forbids (there is no
  `tests/scripts/verify-build.test.ts`). `getRuntimeImportSpecifiers` (`:10`) is only used by it.
- `tests/architecture.test.ts:17-18,28-29,363-368` still allow-list modules deleted in this fork
  (`hosts/amp/*`, `entries/amp.ts`, `hosts/install/*`) — stale, and nothing detects allowlist rot.
- `tests/fixtures/gate/harvested-verdicts.jsonl` (the hand-edited verdict table named in
  `AGENTS.md:22`) **does not exist**.
- Coverage gate is inert: `scripts/verify-coverage.ts` (90% lines/functions) is not wired into
  `check`/CI, ignores branches/statements, and `test:coverage` isn't chained to `verify:coverage`.

### M13. Flaky real-timer polling in tests

Unbounded `while (!ready()) await sleep(10)` in `tests/rules-manager/sync.test.ts:187-189`;
200×10 ms polls racing a 5 s timeout in `tests/hosts/opencode/interaction.test.ts:42-59`;
`setTimeout(…,20)` racing a `pollMs:10` loop in `tests/core/interaction/protocol.test.ts:84`;
wall-clock boundary assertions (`tests/hosts/audit.test.ts:262`, `tests/audit/display.test.ts:37`).
`tests/setup.ts:16` uses `??=` for `CC_SAFETY_NET_HOME`, so an inherited value can steer tests at
a developer's real home.

### M14. Duplicated semantics between the AST analyzer and the linear scanners

`src/gate/analyzer/linear-danger-scanner.ts` re-implements rm/git option detection for the
raw-text/interpreter paths, independent of the AST analyzer. The two can silently diverge (a
change to `rm`/git handling must be mirrored, or a false negative appears). Add a shared table or
a cross-check test over a case matrix.

### M15. `templates/cc-safety-net.ts` reads a file at import time

`src/hosts/templates/cc-safety-net.ts:4` reads `skills/cc-safety-net/SKILL.md` at module load with
no guard; `package.json:17-19` only ships `dist`, so a missing `SKILL.md` throws at import and
breaks the plugin/CLI. Also `skill.slice(skill.indexOf('# CC Safety Net'))` yields the **last
character** if the heading is absent (`indexOf` → `-1`).

---

## 5. Low findings

- `src/gui/assets.ts:4,6,29` require Bun globals (`Bun.file`, `Bun.build`, `HTMLRewriter`) while
  `package.json:97` declares `engines.node >= 18` and `entries/bin.ts` is `#!/usr/bin/env node`.
  `cc-safety-net gui` under Node throws. Align engine/bin or prebuild GUI assets.
- `src/core/io/atomic-write.ts` (`atomicWriteFile`) is dead code (used only by its own test) with a
  predictable `${dest}.${pid}.tmp` and no `O_EXCL`. Delete or replace with `safe-read`'s writer.
- `src/cli/doctor/updates.ts:4-9` always returns "no update"; the update feature is inert, and
  `src/cli/doctor/format.ts:306-313` always prints "Skipped".
- `src/entries/opencode-v2.ts` is a `declare const` shim that exports an `undefined` value at
  runtime; likely a build placeholder — confirm and remove/mark.
- `src/gate/guards/safety-net-invocation.ts:1-7` lists a non-existent entrypoint
  `src/cli/cc-safety-net.ts` and omits `dist/cli.js`; `tests/gate/guards/safety-net-invocation.test.ts`
  pins the phantom path.
- `src/core/policy/env.ts:43-46` calls `console.error` inside a library analysis path (side effect).
- `src/core/policy/snapshot.ts:107-111` `isPublicRuleSource` decides exposure via a fragile regex.
- `wrapper-prelude.ts:84-102` strips any leading token containing `=` (e.g. `--opt=value`) even
  when it is not a recognized `+=` append; can drop a real option.
- `hosts/system-info.ts:55-79` builds a `cmd.exe` command string with a hand-rolled quoter that
  doubles `"` but does not neutralize `%`/`!`; a `%…%` in a path is expanded by cmd (no true
  injection, but incorrect).
- `hosts/opencode/detect.ts:13-16` expands `~` by `join(home, spec.slice(1))`, so `~/../..` can
  escape home (read-only, name must match, low impact).
- `cli/args.ts:55,66` reject option values starting with `-`; no `--flag=value`; `help rule add`
  ignores the second subcmd.
- `audit/reader.ts:38-55` / `cli/audit-log.ts:161-177` read whole log files into memory with no
  size cap.
- `hosts/opencode/tui.ts:104-110` switching to a newer interaction request leaves the previous one
  unanswered until timeout.
- Mixed localization: `hosts/opencode/tui.ts:48-52`, `danger.ts:23-27` contain Chinese UI strings
  while the rest of the codebase is English.
- `.gitignore:13-21` contains local-agent junk (`droid-wiki`, `plans`, `DESIGN.md`, `research`,
  `.impeccable`, `skills-lock.json`); `.gitattributes:1` does not mark committed `dist/` generated;
  `@types/bun: "latest"` (`package.json:67`) is unpinned.
- `tests/helpers/cli-differential.ts:21,73` is named "differential" but compares one
  implementation to itself (in-process vs. a spawned bin of the *same* source); the "both bins"
  title in `tests/gate/explain/run.test.ts:210` overstates it.

---

## 6. Cross-cutting themes

1. **Two independent shell-state trackers that disagree.** `gate/analyzer/segment.ts` handles
   `cd -L/-P/--`, `CDPATH`, and `~`; `gate/guards/guard-walk.ts` does not. Every `cd`-related
   bypass (C1, C2) is a symptom of that duplication. Consolidate on one implementation.
2. **The guard walker is a second, weaker parser.** It re-scans the AST into "events" and misses
   cases the main analyzer handles (quoted command substitution C3, interpreters H1). Prefer
   reusing the analyzer's traversal, or add a differential test that both agree on a corpus of
   tricky commands.
3. **Fail-closed is real but has one hole.** Nearly everything is wrapped, but `getModes` (M1) is
   not, and guard-layer *coverage* (not handling) is where the real bypasses live.
4. **Documentation vs. reality drift.** `AGENTS.md` describes CI, a coverage gate, knip/dup in
   `check`, and a verdict table — none of which are wired up (H3, M12). The "falsifiable checks"
   philosophy is undermined by the checks not running.
5. **Strong hardening where it exists** (`io/safe-read.ts`, `tool-input.ts`, `budget.ts`,
   `rules-manager` fetch limits) sits next to unhardened peers (`store.ts:readPolicyFile`,
   `Math.random`, GUI server) — the split is inconsistent rather than uniformly weak.

---

## 7. Testing assessment

**Strengths (unusually good):**

- A large, hand-written **behavioral + pipeline contract corpus**
  (`tests/gate/behavioral-contract-cases.ts`, `pipeline-contract-cases.ts`) asserting `ruleId`,
  `intent`, `reasonIncludes`, and `segment` through the **real** pipeline, with allow-rows for
  everyday commands and near-misses to guard against over-blocking.
- **No module mocking**: fakes are real symlinked stub executables and real temp trees; git/fs/gh
  are exercised end-to-end.
- **Falsifiability tests**: `tests/architecture.test.ts` proves the linters reject synthetic
  violations; `tests/gate/failure-injection.test.ts` injects a throwing FS and a read-swap race;
  `tests/gate/analysis-budget.test.ts` proves the cap table has no unmapped entry.
- **Determinism tooling**: seeded xorshift, injected clocks, memoized path resolver, env scrubbing,
  cross-platform path normalization; snapshots confined to `explain` and `doctor --json`.

**Gaps (aligned with the confirmed bugs):**

- No guard tests for `cd` options, `pushd`/`popd`, bare `cd`, or double-quoted/backtick command
  substitution — exactly where C1–C3 live.
- No test that interpreters/`xargs` reach the policy/git guards (H1).
- No test that a weakened **project** policy is refused or gated (H2).
- No test imports `dist/`; no build-pipeline tests for `build.ts` / `build-runtime.ts` /
  `verify-build.ts` / `gui-assets.ts` (the least-tested code produces the shipped artifact).
- No GUI install/uninstall or `/api/policy/explain` limit-input tests.

---

## 8. Build, packaging, and release

- `dist/` is committed and rebuilt only by `bun run build`; nothing verifies freshness (H3).
- `scripts/build.ts:25-30` deletes then `renameSync`s public `.d.ts` files; a missing file throws a
  raw `ENOENT`, and the public-declaration allowlist is duplicated (`build-output.ts:2-7` and the
  rename loop).
- `scripts/verify-build.ts:69-71` reports *all* files (not the unexpected/missing diff) and
  hard-requires `chunks.length > 0`, failing valid single-chunk builds.
- `scripts/project-bun.ts:6` `packageManager.slice(4)` assumes the literal `bun@` prefix.
- `package.json` `exports`: `./opencode/v2` maps to `dist/index.js` (same as `.`), and the type
  rename dance is never smoke-tested.
- Dependencies: `effect@4.0.0-rc.112` and `typescript@7.0.2` are preview pins; `@types/bun: latest`
  is non-reproducible.

---

## 9. What is done well

- **`src/core/io/safe-read.ts`** is excellent: `O_NOFOLLOW`, dev/ino re-checks, canonical-root
  containment, adjacent-temp validation, atomic rename, post-rename validation, TOCTOU-aware
  pruning (`audit/retention.ts`).
- **Budgeted, bounded analysis** (`budget.ts`) with a typed `AnalysisLimit` threaded through the
  parser, canonicalization, tool-input walker, and rulebook validation — real DoS resistance.
- **Immutable frozen AST** and a clean two-dialect model; memoized parse store.
- **Defense in depth**: POSIX analyzer + PowerShell analyzer + raw-text scanner + linear scanners
  + guard-level checks.
- **`rules-manager`** fetches only from fixed HTTPS hosts with `redirect: 'error'`, regex-validated
  owner/repo/ref, streaming byte budgets, a request budget, and fixture validation before vendoring.
- **Redaction** (`core/redaction.ts`) covers DSNs, env assignments, provider tokens, PEM, JWT, and
  AWS keys, applied on print/audit paths, plus trace token hashing (`gate/trace.ts`).
- **Thoughtful relaxations** (git worktree / temp-root) that require a real `.git`, no env
  override, no dynamic args, and disjointness from the workspace.
- **`tool-input.ts`** rejects proxies/accessor properties and enforces depth/node/byte budgets.

---

## 10. Prioritized remediation

**P0 — close the confirmed bypasses**

1. Share one `cd` parser between `guard-walk.ts` and `segment.ts`; handle `cd -L/-P/--`, `-`,
   `$HOME`, `pushd`/`popd`, and bare `cd` (C1, C2).
2. Walk nested programs inside double-quoted command substitution in `readWord` (C3).
3. Route interpreter/child commands (`bash -c`, `sh -c`, `eval`, `python -c`, `node -e`,
   `env …`) through the policy/git/secret guards (H1).
4. Add guard contract rows for all of the above (regression lock).

**P1 — enforcement and integrity**

5. Restore a CI workflow running `check` + `knip` + `check-duplicates` + coverage, and add a
   `dist` freshness check (H3, M12).
6. Fix the GUI install/uninstall routes (or remove the buttons) and the `install` command hint
   (H4); wrap `handleRequest` in `try/catch` (H5); add `Host` validation + security headers (H6).
7. Make project-policy weakenings deny-by-default / opt-in (H2).

**P2 — hardening and correctness**

8. Wrap `getModes`/`getConfigFallback` in `pipeline.ts` (M1); harden `readPolicyFile` with
   `safe-read` (M2); redact the interaction channel (M3); use `crypto.randomBytes` (M4).
9. Fix PowerShell auto-detection and the single-quote boundary (M6, M7); fix `&>`, `${…}` nesting,
   and `isShellWhitespace` (M8).
10. Remove dead code (`atomic-write.ts`, `verify-build.ts` `@internal`, `updates.ts`, `opencode-v2.ts`),
    prune stale `architecture.test.ts` allowlists, and reconcile `AGENTS.md` with the real scripts.

---

## Appendix A: verified repros

Environment: Bun 1.4.2 / Node 24, Windows. Each line feeds a command to the real guard entry
(`findSensitiveTargetInCommand` for secrets, `findPolicyConfigMutationTargetInToolInput` for the
policy guard) with `HOME` and `CC_SAFETY_NET_HOME` pointed at a fresh temp tree containing
`home/.ssh/{id_rsa,config}` and `home/.cc-safety-net/policy.json`.

```
# Secret protection (secret.home.ssh) — home-relative .ssh/config
cat <home>/.ssh/config                         => DENY  (secret.home.ssh)
cd <home> && cat .ssh/config                   => DENY
cd -L <home> && cat .ssh/config                => allow   # C1
cd -P <home> && cat .ssh/config                => allow   # C1
cd -- <home> && cat .ssh/config                => allow   # C1
pushd <home> && cat .ssh/config                => allow   # C2
cd <home> && echo "$(cat .ssh/config)"         => allow   # C3

# Policy-file protection
cp /dev/null <userPolicy>                       => DENY
echo {} >> <userPolicy>                         => DENY
echo "$(cp /dev/null <userPolicy>)"            => allow   # C3
cd -P <home> && rm -rf .cc-safety-net           => allow   # C1
cd -- <home> && rm -rf .cc-safety-net           => allow   # C1
bash -c "cp /dev/null <userPolicy>"             => allow   # H1
sh -c "cp /dev/null <userPolicy>"               => allow   # H1
eval "cp /dev/null <userPolicy>"                => allow   # H1
python3 -c "open('<userPolicy>','w')"           => allow   # H1
node -e "require('fs').writeFileSync('<userPolicy>','')" => allow  # H1
env bash -c "cp /dev/null <userPolicy>"         => allow   # H1
echo <userPolicy> | xargs cp /dev/null          => DENY    (handled separately)
```

Walker cwd state (the root cause of C1/C2), dumped from `walkGuardSyntax` `state.cwd`:

```
cd <home>      && cat .ssh/config  -> cwd = <home>            (correct)
cd -L <home>   && cat .ssh/config  -> cwd = <workspace>/-L    (wrong)
cd -P <home>   && cat .ssh/config  -> cwd = <workspace>/-P    (wrong)
cd -- <home>   && cat .ssh/config  -> cwd = <workspace>/--    (wrong)
pushd <home>   && cat .ssh/config  -> cwd = <workspace>       (stale)
```

Appendix B: repository facts checked directly

```
.github/                                      -> missing (no CI)
tests/fixtures/gate/harvested-verdicts.jsonl  -> missing
src/hosts/amp, src/hosts/install              -> missing (stale allowlists)
package.json:48 "check"                       -> lint + lint:comments + format:check + typecheck + test
                                                 (knip / check-duplicates / verify:coverage omitted)
```
