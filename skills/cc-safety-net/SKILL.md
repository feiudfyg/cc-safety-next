---
name: cc-safety-net
description: "Operate CC Safety Net: explain why a command was blocked, triage false positives, configure custom rulebooks, manage agent CLI integrations, and diagnose protection."
disable-model-invocation: true
---

# CC Safety Net

CC Safety Net runs as an OpenCode plugin and blocks destructive commands and secret access
before they run. The `cc-safety-net` CLI inspects and controls that protection. Run it as
`npx -y cc-safety-net`.

## Learn the current CLI

The installed CLI is the authority for command syntax. Do not guess flags.

```bash
npx -y cc-safety-net --help
npx -y cc-safety-net help <command>
```

Run `npx -y cc-safety-net rule doc` and treat that output as the complete source of truth for
rulebook schema, paths, GitHub sources, matching behavior, and validation.

These commands are read-only and safe to run for discovery: `--help`, `--version`, `status`,
`doctor`, `logs` (without `--prune-legacy`), `explain`, `rule list`, `rule verify`, `rule doc`,
`policy check`, `help`. Every other command mutates configuration or installed integrations; run
those only as part of a workflow below.

## Core model

- Built-in guards always apply. Custom rules only add restrictions; nothing in rule config can
  bypass built-in CC Safety Net protections.
- Config files (`rule.json`) list rulebook sources. Rule definitions live in `rulebook.json`,
  not directly in `rule.json`.
- Three scopes: user (all projects), project (current project only), and shareable GitHub
  rulebooks at `.cc-safety-net/rules/<rulebook-name>/rulebook.json` in a repository.
- Rulebooks are live files. The runtime reads each `rulebook.json` on every tool call, so a saved
  edit applies to the next command with no sync step.
- `policy.json` sets the safety level, per-feature toggles, per-rule overrides, and path lists. It
  has two scopes: the project file `.cc-safety-net/policy.json`, committed and shared with the
  team, layered on the user file that applies to every project.
- The session safety level is `standard`, `strict`, or `paranoid`, set per session with the
  `CC_SAFETY_NET_LEVEL` environment variable.

## Choose the workflow

- The user asks why a command was blocked, or shows a `BLOCKED by CC Safety Net` message:
  explain a decision.
- The user thinks a block was wrong: triage a false positive.
- The user wants to add, edit, disable, or migrate blocking rules: configure rules.
- The user wants to change the safety level, toggle a protection, or adjust path lists: configure
  the policy.
- The user wants the OpenCode plugin checked or configured: manage the integration.
- A rule does not fire, or the user asks whether protection is working: diagnose.
- The user asks how or why the analyzer behaves a certain way, beyond what `explain` and
  `rule doc` show: answer from the source.

## Explain a decision

1. Get the exact blocked command. If the user does not have it, find it with
   `npx -y cc-safety-net logs` (narrow with `--project .`, `--agent <name>`, or `--since <days>`).
2. Pass the exact command to `npx -y cc-safety-net explain` as one literal argument. Prefer an
   argv-capable tool; when invoking through a shell, shell-escape the whole command as one
   argument. Never interpolate raw command text into double quotes: `$()`, backticks, and
   variables would expand before `explain` receives it. Add `--cwd <path>` when the decision
   depends on the working directory. Once received, `explain` analyzes the string and never
   executes it.
3. Read the trace: how the command was split, which rule matched, and the RESULT status and
   reason. `explain` exits 0 for both allowed and blocked verdicts; read the verdict from the
   output, not the exit status.
4. Report the reason in plain language. For a genuine hazard, suggest the safer alternative the
   reason names, such as `git stash` before `git reset --hard`.

## Triage a false positive

1. List recent suspect denials with `npx -y cc-safety-net logs --suspect --since 7`, or fetch
   one entry with `npx -y cc-safety-net logs --id <id>`.
2. Reproduce the decision with `explain` and read which rule fired.
3. If a custom rule fired, fix that rulebook: disable or reword it with an override, or edit the
   rule (see configure rules), then re-run `explain` to confirm the new verdict.
4. If a built-in rule fired, no rule edit can relax it. Check the reason for a documented escape
   hatch, such as `CC_SAFETY_NET_WORKTREE=1` for local git discards in linked worktrees (git
   discards in a temp-root repository outside the workspace are already allowed), or
   `rule wrapper add` when a trusted transparent wrapper hid the real command from the analyzer.
   Pass the wrapper name as a separate argv value, or shell-escape it as one argument. If the
   user explicitly wants that built-in rule off, read its id from the `ruleId` field of
   `explain --json` and propose a per-rule policy override (see configure the policy). Otherwise
   explain the risk the rule guards against.

## Configure rules

Use information already provided in the user's prompt. Ask only when the scope, action, rule
intent, merge behavior, or target command is unclear.

1. Determine the requested scope from the prompt when possible:
   - User: applies to all projects.
   - Project: applies only to the current project.
   - GitHub: edits or creates a shareable rulebook structure in the current repository.
2. Determine whether to add a rule, edit a rule, disable a rule, override a reason, trust a
   transparent wrapper, migrate legacy rules, or explain custom rules from the prompt when
   possible.
3. Inspect existing configs before modifying installed local rules:
   - Run `npx -y cc-safety-net rule verify`
   - Run `npx -y cc-safety-net rule list`
4. Inspect relevant project files only when the user asks for rule suggestions or the requested
   rule depends on project context. Look at manifests, scripts, task runners, CI, infrastructure,
   database, migration, and deployment files that explain risky commands.
5. Convert the request into valid CC Safety Net JSON using `rule doc`.
   - For User or Project scope, add or edit the selected local `rule.json` and
     `<rulebook-name>/rulebook.json`.
   - For GitHub scope, add or edit `.cc-safety-net/rules/<rulebook-name>/rulebook.json` in the
     current repository.
   - Do not offer to add a GitHub source with `owner/repo`; installing rules from a GitHub
     source is outside this workflow.
   - If the user explicitly asks to install existing GitHub rulebooks instead of authoring them,
     use `npx -y cc-safety-net rule add owner/repo --only <rulebook...>`; omit `--only` only
     when they want every rulebook, and add `--ref <ref>` only when they name a non-default ref.
     `rule add --only <rulebook...>` with no source selects from the official
     `cc-safety-net/rulebooks` repository, whose curated rulebooks block destructive Terraform,
     AWS, gcloud, and Azure CLI operations; prefer installing one of those over authoring when it
     already covers the request.
   - For transparent wrappers, prefer `npx -y cc-safety-net rule wrapper add` with the trusted
     wrapper name passed as a separate argv value, or shell-escaped as one argument, over editing
     `rule.json` by hand.
6. Preserve unrelated existing rulebook sources, overrides, and rulebooks. Preview proposed JSON
   before writing when creating a new rulebook, merging with existing config, or resolving
   ambiguity.
7. For GitHub rules, ensure the repository layout is
   `.cc-safety-net/rules/<rulebook-name>/rulebook.json`, and ensure the source name, directory
   name, and rulebook `name` match exactly.
8. Validate after edits:
   - User or Project rules: run `npx -y cc-safety-net rule verify` and `npx -y cc-safety-net rule
     list`. Both commands cover every scope, so neither takes `--global`.
   - Shareable GitHub rulebook-only edits: run `npx -y cc-safety-net rule verify`. Run `list` only
     if the rulebook is also installed in local `rule.json`.
9. If validation fails, show the exact errors and make the smallest fix.
10. Confirm the saved paths or GitHub rulebook path and summarize the added or updated rules.

Rule invariants:

- Do not use legacy inline `.safety-net.json` or `~/.cc-safety-net/config.json` rules. Convert
  existing legacy files with `npx -y cc-safety-net rule migrate`.
- Every rule command must be listed in `allowed_commands`. The `tests` fixtures are optional;
  `rule verify` evaluates `rulebook_version` 2 fixtures against the rulebook's own rules, and
  fixture commands are analyzer input that CC Safety Net never executes.
- A blocked fixture, when present, must specify the expected `rule`, and that rule must exist in
  the rulebook.
- Local source names are bare names such as `project-rules`; do not put filesystem paths in
  `rules`.
- A saved rulebook is live. There is no pending state and nothing to run afterwards, so verify the
  edit rather than activating it.
- A missing or invalid rulebook file makes that source inactive, and an unreadable or invalid
  `rule.json` makes every source in its scope inactive: those rules stop applying while other
  custom rules and built-in protections stay active. Fix the file named in the diagnostic.
- A duplicate rulebook name keeps the first claim, user scope before project scope, and ignores
  the later rulebook.
- `npx -y cc-safety-net rule add owner/repo` fetches remote rulebooks, validates them, and vendors
  each one into `<rulebook-name>/rulebook.json`; `npx -y cc-safety-net rule update [source]`
  re-fetches and overwrites those copies and prints what changed. The runtime never fetches, and a
  remote source with no vendored file reports that `rule update` has to vendor it first.
- `rule sync` is deprecated: it only migrates lock and cache leftovers from an earlier version.
  Never run it as a validation or activation step.

## Configure the policy

Both `policy.json` files are protected: you propose the change, the user applies it. Reading them
is allowed, writing them is not.

`policy.json` fields, all optional except `version: 1` (`policy check` reports every schema
error, so validate against it rather than guessing further fields):

- `safety.level`: `standard`, `strict`, or `paranoid`. `safety.overrides`: booleans for
  `fail_closed`, `paranoid_rm`, and `paranoid_interpreters` that pin one capability apart from
  the level.
- `workflow.worktree_mode`: boolean, allows local git discards in linked worktrees; discards in a
  temp-root repository outside the workspace need no toggle.
- `destructive_command_protection` and `secret_protection`: an `enabled` boolean, and per-rule
  `overrides` mapping a built-in rule id (`git.reset-hard`, `secret.basename.env`) to `"on"` or
  `"off"`. Get the id for a blocked command from the `ruleId` field of `explain --json`.
- `destructive_command_protection.allow_paths`: absolute or `~/` paths where recursive delete
  targets are permitted. `secret_protection.allow_paths`: exact user-managed files or directories,
  or a folder followed by `**/` and an exact file name (for example `~/code/**/.env.local`; the
  folder cannot be home or above it), exempted from built-in secret patterns. Deny paths and
  Coding CLI protections still win. Other glob forms are rejected.
  `secret_protection.deny_paths`: extra paths protected like built-in secrets.
- `audit.retention_days`: days of audit history to keep, user scope only.

1. Inspect the current state: `npx -y cc-safety-net status` for the effective policy and the file
   paths it loaded, `npx -y cc-safety-net rule list` for custom rules, plus whatever project
   context the request depends on. Read an existing `policy.json` before proposing changes to it.
2. Write the proposed policy JSON to an unprotected path such as `policy-proposal.json`. For
   project scope, set only the fields the team intends to control; an unset field inherits
   from the user policy, and `apply` writes only the fields the proposal sets.
   Applying replaces the target file, so the proposal is the complete policy, not a patch. Audit
   settings are user scope only; a project proposal cannot set them.
3. Run `npx -y cc-safety-net policy check policy-proposal.json` and show the user the printed
   diff. Add `--global` to target the user policy instead of the project one. Fix every reported
   error and re-check until it passes.
4. Ask the user to run the apply in their own terminal and quote the exact command:
   `npx -y cc-safety-net policy apply policy-proposal.json` (with `--global` when that is the
   scope). It confirms interactively, there is no `--yes` flag, and agent invocations of
   `policy apply` are blocked by design, so never run it, wrap it, or write the file yourself.
5. Once the user confirms they applied it, run `npx -y cc-safety-net status` and report the
   effective policy, including any project scope deltas it prints.

## Manage the integration

1. Run `npx -y cc-safety-net doctor` first. It reports the OpenCode plugin as detected,
   configured, and verified.
2. The plugin loads from the `plugin` array in `opencode.json`/`opencode.jsonc`. This build is
   installed from a local path or a private package; there is no `install`, `update`, or
   `uninstall` command and no network update check.
3. After any change to the OpenCode config, run `doctor` again and confirm the OpenCode row reads
   as verified.

## Diagnose

1. `npx -y cc-safety-net status` shows what the runtime enforces right now, including a degraded
   `policy.json` that `rule list` does not report.
2. `npx -y cc-safety-net doctor` verifies the installation: plugin detection and config,
   a synthetic guard self-test, and configuration scopes. Use `--json` when parsing the result.
3. When a custom rule does not fire, run in order: `rule verify`, `rule list`, then re-test the
   command with `explain`.

## Answer from the source

For questions the CLI output cannot settle, such as why the analyzer treats a construct a
certain way or whether a gap is a known limitation, read the source code of the installed
version.

1. Get `<version>` from `npx -y cc-safety-net --version`.
2. Locate the repository. Plugin installs ship the full repository, and this skill file lives
   at `<repo>/skills/cc-safety-net/SKILL.md` inside it, so the repository root is two
   directories above the skill file. Use the candidate only if its `package.json` has
   `"name": "@local/cc-safety-net"` and version `<version>`, and a `src/` directory exists next to it.
   If the package version differs, run `doctor` to report the outdated integration, then treat
   the candidate as unavailable and continue to the next step.
3. If no matching local root exists, the source is not available locally. Do not fetch it from
   the network; answer from CLI output and say that the source was unavailable.
4. For behavior questions, read `src/` directly (for example `src/gate/analyzer`,
   `src/gate/guards`, and `src/core/rules`).
5. State in the answer which version the source came from. Treat the located source as
   read-only reference; do not edit, build, or run it.

## Safety rules

- Help the user operate CC Safety Net, never evade it. Do not change levels, uninstall, edit
  config, or propose a policy that weakens protection to get a blocked command through unless the
  user explicitly asks for that outcome and understands what the block guards against.
- `logs --prune-legacy` permanently deletes legacy logs. Run it only on an explicit request, and
  run it with `--dry-run` first.
- `rule remove --delete-source` deletes the local source directory. Ask before using it.
- Prefer `gui --no-open` and give the user the URL instead of opening a browser from a session.
