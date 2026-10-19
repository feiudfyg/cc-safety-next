# CC Safety Net (OpenCode fork)

> A detached, self-maintained fork of CC Safety Net, reduced to an OpenCode plugin
> (`@local/cc-safety-net`). It is not published to npm, is not affiliated with the upstream
> project, and does not check for or fetch updates from any upstream service.

CC Safety Net blocks destructive commands and secret access before a tool call runs. It parses
what the command does, so wrapping the command or reordering flags does not hide it. Built-in
protections always apply; custom rules can only add restrictions.

## Requirements

- OpenCode v2 with plugin support (`@opencode/plugin` 2.0.6+).
- Node.js 18 or higher for the CLI and the library API.
- pnpm 12.14.0 for dependencies (pinned in `package.json`).
- Bun 1.4.2 for building and running the test suite (pinned in `.bun-version`).

## Install

This package is installed from a local checkout. For a step-by-step runbook written for another
LLM or automated installer, see [docs/llm-install.md](docs/llm-install.md).

### 1. Build

```bash
pnpm install --frozen-lockfile
pnpm run build
```

The build writes `dist/`. OpenCode loads the built entrypoints, not the TypeScript sources.

### 2. Register the plugin with OpenCode

OpenCode v2 reads local plugins from the `plugins` array in `opencode.json(c)`. Add the built
`dist` directory as an absolute path:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/absolute/path/to/cc-safety-next/dist"]
}
```

On Windows, use forward slashes:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["E:/CodeProjects/cc-safety-next/dist"]
}
```

The default export of `dist/index.js` is the guard plugin, and `dist/tui.js` provides the override
dialog. One entry loads both.

Point the entry at `dist`, not at the repository root and not at a file inside it. OpenCode
resolves a configured plugin directory through its `index.*` entrypoint; the repository root has
no `index.*`, while `dist/` does.

The global config lives at `~/.config/opencode/opencode.json` or `.jsonc` (on Windows,
`%USERPROFILE%\.config\opencode\opencode.json`). A project can instead use `opencode.json(c)` or
`.opencode/opencode.json(c)` in the project root. `OPENCODE_CONFIG_DIR` overrides the global
directory.

Optional plugin options can pin the shell dialect:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "/absolute/path/to/cc-safety-next/dist",
      "options": { "shell": "posix" }
    }
  ]
}
```

`shell` must be `posix` or `powershell`. When omitted it defaults to `powershell` on Windows and
`posix` elsewhere. Set it to match the shell OpenCode actually uses; a mismatch makes the plugin
reject shell calls with a configuration error.

Restart OpenCode after editing the config. If OpenCode runs as a background service, run
`opencode service restart`.

### 3. Verify

```bash
opencode plugin list
node dist/bin/cc-safety-net.js doctor --skip-update-check
node dist/bin/cc-safety-net.js status
node dist/bin/cc-safety-net.js explain "git reset --hard"
```

`opencode plugin list` should show `cc-safety-net` with its source under `dist/index.js`. In an
active session, the `/cc-safety-net` command is also available.

## Configuration

### Settings

The plugin keeps its settings in `~/.cc-safety-net/settings.json`. `CC_SAFETY_NET_HOME` overrides
the directory. The file is created on first run with `temp_dir` and `prompts_dir`:

```json
{
  "temp_dir": "<OS temp dir>",
  "prompts_dir": "prompts"
}
```

Optional keys:

```json
{
  "interaction": false,
  "interaction_timeout_seconds": 120
}
```

- `temp_dir` — scratch files and the block-interaction queue.
- `prompts_dir` — prompt files, resolved relative to `~/.cc-safety-net`.
- `interaction` — set to `false` to disable the override dialog.
- `interaction_timeout_seconds` — how long a block waits for an answer before it stays blocked.

Every agent-facing message is a Markdown file under `prompts/`: block headers, intent footers,
working-directory reasons, the rulebook guide (`rule-doc.md`), and the `/cc-safety-net` command
text. Each file is seeded with its default text and can be edited; an empty file falls back to the
default.

### Policy

Two policy files are layered, project on top of user:

- `~/.cc-safety-net/policy.json` — user scope, all projects.
- `<project>/.cc-safety-net/policy.json` — project scope, committed with the repository.

The policy sets the safety level, per-feature toggles, per-rule overrides, path lists, worktree
mode, and audit retention. Edit it through `cc-safety-net gui`, or prepare a proposal and validate
it with `cc-safety-net policy check` before applying it with `cc-safety-net policy apply`.
`cc-safety-net status` shows the effective policy and flags a project policy that weakens the
user policy.

Safety levels:

| Level      | Effect                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `standard` | Default. Baseline destructive-command and secret protections, including Git metadata and protected paths.                             |
| `strict`   | Standard, plus fail-closed rules that block dynamic or unverifiable command targets and structures the analyzer cannot verify safely. |
| `paranoid` | Strict, plus recursive-force removal of non-temp paths (including inside the project) and interpreter one-liners.                     |

Set the level in the policy, or request a level for one session with `CC_SAFETY_NET_LEVEL`; the
stricter of the two wins.

To allow one file name at any depth under a folder, add an entry such as
`"~/code/**/.env.local"` to `secret_protection.allow_paths` in your user policy. Other env
variants stay blocked. The folder before `**/` is required and cannot be your home directory or a
folder above it, so home credentials such as `~/.ssh` and `~/.npmrc` stay protected. Only a
folder, `**/`, and an exact file name are supported; configured deny paths still win.

### Rulebooks

Rule config files list rulebook sources; rule definitions live in `rulebook.json`, not directly in
`rule.json`.

- User rule config: `~/.cc-safety-net/rules/rule.json`.
- Project rule config: `<project>/.cc-safety-net/rules/rule.json`.
- Rulebook files: `<rules dir>/<rulebook-name>/rulebook.json`.

A rulebook can only add blocks; it cannot turn built-in protection off. Rulebooks are read on
every tool call, so a saved edit applies to the next command. Add a GitHub source and sync it:

```bash
node dist/bin/cc-safety-net.js rule add acme/safety-rules --only aws gcloud
```

`rule init`, `add`, `remove`, `update`, `list`, `wrapper`, `migrate`, `doc`, and `verify` cover
the rest. Treat `cc-safety-net rule doc` as the authoritative schema and path reference.

### Environment variables

| Variable                                         | Effect                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| `CC_SAFETY_NET_LEVEL=standard\|strict\|paranoid` | Session safety level; the stricter of this and the policy level wins. |
| `CC_SAFETY_NET_WORKTREE=1`                       | Allow local Git discards in linked worktrees.                         |
| `CC_SAFETY_NET_DEBUG=1`                          | Print diagnostic messages to stderr.                                  |
| `CC_SAFETY_NET_AUDIT_SCOPE=all\|blocked`         | Record all command decisions, or denials only. The default is `all`.  |
| `CC_SAFETY_NET_HOME`                             | Override the `~/.cc-safety-net` config directory.                     |
| `CC_SAFETY_NET_NO_INTERACTION`                   | Disable the interactive override dialog.                              |

Legacy variables are still supported: `CC_SAFETY_NET_STRICT=1`,
`CC_SAFETY_NET_PARANOID=1`, `CC_SAFETY_NET_PARANOID_RM=1`, and
`CC_SAFETY_NET_PARANOID_INTERPRETERS=1`.

## Interactive override

When a command is blocked and a TUI is running, the plugin shows a dialog whose header names the
rule that fired, with the blocked call shortened to one line. The options are:

- **Allow once** — allow this call one time.
- **Allow for this session** — allow identical blocks for the rest of the session.
- **Reject** — keep blocking.

Without a live TUI, with `interaction` disabled in `settings.json`, or with
`CC_SAFETY_NET_NO_INTERACTION` set, the command stays blocked.

## CLI

Run the built CLI from the checkout with Node:

```bash
node dist/bin/cc-safety-net.js status
node dist/bin/cc-safety-net.js doctor
node dist/bin/cc-safety-net.js explain "git reset --hard"
node dist/bin/cc-safety-net.js logs
node dist/bin/cc-safety-net.js rule doc
node dist/bin/cc-safety-net.js gui
```

| Command   | Purpose                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `status`  | Show what the runtime is enforcing right now.                                                              |
| `doctor`  | Run diagnostic checks for the installation and configuration. Supports `--json` and `--skip-update-check`. |
| `logs`    | Browse the local audit trail. Supports `--json`, filters, `--all`, and `--prune-legacy`.                   |
| `explain` | Print the step-by-step analysis of a command without executing it. Supports `--json` and `--cwd`.          |
| `rule`    | Manage rule config and rulebook sources; `rule doc` prints the authoring guide.                            |
| `policy`  | Validate and apply policy proposals.                                                                       |
| `gui`     | Open the local policy editor; `--no-open` prints the URL.                                                  |

`explain` exits 0 for both allowed and blocked verdicts; read the verdict from the output. The
audit trail stays on your machine. It records command decisions, not command output or prompts.

To run the CLI as `cc-safety-net` instead of the Node path, link the checkout globally with
`pnpm link --global` (the global pnpm bin directory must be on `PATH`).

## The `/cc-safety-net` command

When the plugin is active, it registers a `/cc-safety-net` command. The command prompt embeds the
operator skill in `skills/cc-safety-net/SKILL.md`, so it can explain why a command was blocked,
triage a false positive, configure rulebooks, change the policy or safety level, and diagnose
protection. The command prompt is only used when invoked.

## Library API

Check a command from Node.js without running the plugin:

```ts
import { checkCommand } from '@local/cc-safety-net/api';

const result = checkCommand({ command: 'git status', cwd: process.cwd() });
if (result.kind !== 'allow') {
  throw new Error(result.reason);
}
```

`cwd` must be an absolute directory path. If `checkCommand` throws, do not run the command.

## Development

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm run check
```

- `pnpm run check` runs lint, comment policy, formatting, typecheck, and the Bun test suite.
- `pnpm run test:coverage` writes coverage; `pnpm run verify:coverage` enforces the threshold.
- `dist/` is committed and must match `src/`. Rebuild it with `pnpm run build` after source
  changes; never hand-edit build output.
- Tests live in `tests/` and mirror `src/`. Bun-specific APIs and `bun:test` are intentional.
- The Bun version is pinned in `.bun-version`; `scripts/project-bun.ts` launches that version for
  the build.

## Limitations

CC Safety Net denies a tool call before it runs. It does not set filesystem permissions, watch
network egress, or contain a process.

Policy and secret-path extraction are mostly POSIX. For PowerShell they resolve a home prefix
(`$HOME`, `$env:USERPROFILE`, `$env:HOME`, or `~`) joined to a literal suffix with `\` or `/`.
The same check applies to `Get-Content`, `Set-Content`, `Add-Content`, `Copy-Item`, `Move-Item`,
`Remove-Item`, and their aliases. `Get-Content $HOME\.ssh\id_rsa` is denied. A path built by
concatenation, a subexpression, or `Join-Path` is not.

Policy-file protection matches exact paths. It does not emulate commands. Use OS permissions or a
sandbox when you need that.

## License

AGPL-3.0-or-later (see [LICENSE](LICENSE)).

This project is a fork of [cc-safety-net](https://github.com/kenryu42/cc-safety-net) by J Liew,
which is licensed under the MIT License. The original MIT terms are retained in
[LICENSE-MIT](LICENSE-MIT) and apply to the portions derived from it.
