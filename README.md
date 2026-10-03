# CC Safety Net (OpenCode fork)

> A detached, self-maintained fork of CC Safety Net, reduced to an OpenCode plugin
> (`@local/cc-safety-net`). It is not published to npm, is not affiliated with the upstream
> project, and does not check for or fetch updates from any upstream service.

CC Safety Net blocks destructive commands and access to secrets such as SSH keys and `.env`
files before the tool call runs. It parses what the command does, so wrapping the command or
reordering flags does not hide it. A broken config file never blocks anything.

## Requirements

- OpenCode with plugin support: `@opencode-ai/plugin` 1.18.29+ or `@opencode/plugin` 2.0.6+.
- Node.js 18 or higher for the CLI.
- Bun to build from source.

## Build

```bash
bun install
bun run build
```

## Install into OpenCode

OpenCode loads two independent plugin kinds: **server** plugins come from `opencode.json`,
and **TUI** plugins come from a separate `tui.json`. Register this plugin in both files so
that blocking runs on the server and the interactive override dialog runs in the TUI.

Add an absolute path (or a `file://` URL) to the global config:

`~/.config/opencode/opencode.json`

```json
{
  "plugin": ["/absolute/path/to/cc-safety-next"]
}
```

`~/.config/opencode/tui.json`

```json
{
  "plugin": ["/absolute/path/to/cc-safety-next"]
}
```

On Windows use forward slashes, for example `"E:/CodeProjects/cc-safety-next"`. Project-level
config (`opencode.json` and `tui.json` beside it) works the same way.

- The `opencode.json` entry is the actual guard: it blocks destructive commands and secret
  access before a tool call runs.
- The `tui.json` entry loads the override dialog. If you register only the server entry, every
  block stays non-interactive and the command is simply denied.
- Restart OpenCode after editing either file. Running instances do not pick up plugin changes.

Because the built `dist/` is loaded directly, run `bun run build` whenever you change the source.

## Configuration

The plugin keeps its config in `~/.cc-safety-net` (override the directory with
`CC_SAFETY_NET_HOME`). `settings.json` is generated on first run with `temp_dir` and
`prompts_dir`:

```json
{
  "temp_dir": "<OS temp dir>",
  "prompts_dir": "prompts"
}
```

Two optional keys can be added by hand:

```json
{
  "interaction": false,
  "interaction_timeout_seconds": 120
}
```

- `temp_dir` — where scratch files and the block-interaction queue live.
- `prompts_dir` — resolved relative to `~/.cc-safety-net`.
- `interaction` — set to `false` to disable the interactive override dialog.
- `interaction_timeout_seconds` — how long a block waits for an answer before it stays blocked.

Every agent-facing message is a Markdown file under `prompts/`: the block headers, the intent
footers, the working-directory reasons, the rulebook guide (`rule-doc.md`), and the
`/cc-safety-net` command text. Each file is seeded with its default text and can be edited; an
empty file falls back to the default.

## Interactive override

When a command is blocked and a TUI is running, the plugin shows a danger-colored toast and a
dialog with:

- **单次放行** — allow this call once.
- **本次会话放行** — allow matching blocks for the rest of the session.
- **拒绝** — keep blocking.

The color reflects the risk (high → red, medium → yellow, low → blue). Without a live TUI, or
with `interaction` disabled, the command is blocked as usual.

## Safety presets

| Preset | Effect |
|---|---|
| Standard | Blocks recognizable destructive Git and filesystem commands. Allows metadata-only checks of built-in sensitive paths while continuing to block content access. Recommended for normal coding. |
| Strict | Standard, plus blocks dynamic or unparseable commands the analyzer cannot verify safely. Also blocks metadata-only discovery of built-in sensitive paths. Occasional false positives on advanced shell. |
| Paranoid | Strict, plus blocks `rm -rf` inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos. |

Set a preset from the GUI (`... gui`, then Policy).

To allow one file name you manage at any depth under a folder, add an entry such as
`"~/code/**/.env.local"` to `secret_protection.allow_paths` in your user policy. Other env
variants stay blocked. The folder before `**/` is required and cannot be your home directory or
a folder above it, so home credentials such as `~/.ssh` and `~/.npmrc` stay protected. Only a
folder, `**/`, and an exact file name are supported; configured deny paths still win.

## CLI

Run the built CLI from the repository:

```bash
# Summarize what is being enforced right now
node dist/bin/cc-safety-net.js status
# Verify the installation and run a self-test
node dist/bin/cc-safety-net.js doctor
# Trace how a command is analyzed step-by-step
node dist/bin/cc-safety-net.js explain "git reset --hard"
# Browse recorded denials from the audit trail (add --all to include allowed commands)
node dist/bin/cc-safety-net.js logs
# Print the rulebook authoring guide
node dist/bin/cc-safety-net.js rule doc
# Review and edit your policy in a local web GUI
node dist/bin/cc-safety-net.js gui
```

`doctor`, `explain`, and `logs` support `--json` for machine-readable output. The audit trail
stays on your machine. It records command decisions, but not command output or prompts.

## Rulebooks

Rulebooks add blocks. A rulebook can only add blocks; it cannot turn built-in protection off.
Add a GitHub source and sync it:

```bash
node dist/bin/cc-safety-net.js rule add acme/safety-rules --only aws gcloud
```

`rule init`, `add`, `remove`, `update`, `list`, `verify`, `migrate`, and `wrapper` manage the
rest. See `rule --help`.

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

## The `/cc-safety-net` command

The OpenCode integration builds in a `/cc-safety-net` command backed by the skill in
`skills/cc-safety-net/SKILL.md`. Ask it why a command was blocked, whether a block was wrong,
how to write or migrate custom rules, how to change the policy or safety level, or whether
protection is working. It loads only when invoked, so it takes no context-window space until
you type the command.

## Limitations

CC Safety Net denies a tool call before it runs. It does not set filesystem permissions, watch
network egress, or contain a process.

The policy and secret-path extractors are mostly POSIX. For PowerShell they resolve a home
prefix (`$HOME`, `$env:USERPROFILE`, `$env:HOME`, or `~`) joined to a literal suffix with `\` or
`/`. The same check applies to `Get-Content`, `Set-Content`, `Add-Content`, `Copy-Item`,
`Move-Item`, `Remove-Item`, and their aliases. `Get-Content $HOME\.ssh\id_rsa` is denied. A path
built by concatenation, a subexpression, or `Join-Path` is not.

Policy-file protection matches exact paths. It does not emulate commands. Use OS permissions or
a sandbox when you need that.

## License

AGPL-3.0-or-later (see [LICENSE](LICENSE)).

This project is a fork of [cc-safety-net](https://github.com/kenryu42/cc-safety-net) by J Liew,
which is licensed under the MIT License. The original MIT terms are retained in
[LICENSE-MIT](LICENSE-MIT) and apply to the portions derived from it.
