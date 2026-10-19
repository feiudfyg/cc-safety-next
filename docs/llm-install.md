# CC Safety Net: LLM installation runbook

This document is for an LLM or automated installer helping a user install **CC Safety Net** as an
OpenCode v2 plugin from a local checkout. Follow it literally, verify each step, and do not claim
success until the verification checks pass.

## Scope and assumptions

- This repository is a private, local package (`@local/cc-safety-net`). It is not published to npm.
- Installation means: build the checkout, then add its `dist` directory to OpenCode's `plugins`
  array, then restart and verify.
- The plugin runs inside OpenCode and guards tool calls. It does not install a shell hook, a
  system service, or a global binary.
- The checkout path is referred to below as `<repo>`. Resolve it to the repository root: the
  directory containing `README.md`, `package.json`, and `pnpm-lock.yaml`. This document lives in
  `<repo>/docs/`.
- Stop if OpenCode is version 1.x. This package targets the OpenCode v2 plugin API.

## Safety rules for the installer

- Ask before editing a user-global config. Back it up first.
- Preserve unrelated configuration keys and JSONC comments.
- Read only the config keys you need. Never echo API keys, tokens, secret paths, or unrelated
  configuration values into chat or logs.
- Never disable the plugin, lower the safety level, or delete its config merely to make a command
  pass. Use `explain`, the TUI "Allow once" action, or a policy change instead.
- Do not run blocked or destructive commands to test the installation. Use `explain`.
- Do not hand-edit `dist/`; rebuild it from source.
- Do not regenerate `pnpm-lock.yaml` unless the user explicitly asks. If
  `pnpm install --frozen-lockfile` fails because the lockfile is stale, stop and report it.

## 1. Preflight

Run these checks and confirm the outputs:

```bash
cd <repo>
git status --short
node --version
pnpm --version
bun --version
opencode --version
```

Requirements:

- Node.js 18 or newer.
- pnpm 12.14.0 (the version pinned in `package.json`). A different pnpm version may work, but do
  not commit a different lockfile.
- Bun 1.4.2 (the version in `.bun-version`).
- OpenCode 2.x.

If a tool is missing, stop and tell the user what is missing. Do not install pnpm or Bun globally
without the user's consent.

Check that the checkout has not been left in a broken state. These files must exist:
`package.json`, `pnpm-lock.yaml`, and `.bun-version`. `dist/index.js` may be absent until the build
step; if it is absent, the build is still required.

Use `Test-Path <file>` in PowerShell or `test -f <file>` in a POSIX shell if you want to check
programmatically.

## 2. Build

```bash
cd <repo>
pnpm install --frozen-lockfile
pnpm run build
```

`pnpm run build` deletes and recreates `dist/`, then verifies the artifacts. It must print
`Build verification passed`.

Confirm the entrypoints exist:

`dist/index.js`, `dist/tui.js`, and `dist/bin/cc-safety-net.js` must exist. On Windows PowerShell,
use `Test-Path`; in a POSIX shell, use `test -f`.

Keep `<repo>/node_modules` in place. The built plugin imports `@opencode/plugin` from that tree;
removing it after the build can make the plugin fail to load.

Optional: if the user wants the `cc-safety-net` CLI on `PATH`, ask before running
`pnpm link --global` from `<repo>`, then verify with `cc-safety-net --version`. The global pnpm bin
directory must be on `PATH`. This is not required for the OpenCode integration; the commands below
work through `node <repo>/dist/bin/cc-safety-net.js` without it.

If the build fails:

- Check `bun --version` against `.bun-version`.
- Re-run `pnpm install --frozen-lockfile`.
- Read the first build error, not only the final "Build failed" line.
- Do not patch `dist/` by hand.

## 3. Choose the OpenCode config file

Ask the user whether protection should apply globally or only to one project. If they have no
preference, recommend global.

Global config, checked in this order:

1. `$OPENCODE_CONFIG_DIR/opencode.json` or `opencode.jsonc`
2. `$XDG_CONFIG_HOME/opencode/opencode.json(c)`
3. `~/.config/opencode/opencode.json(c)` (on Windows: `%USERPROFILE%\.config\opencode\opencode.json`)

Project config (applies to that project and its descendants):

- `<project>/opencode.json(c)`
- `<project>/.opencode/opencode.json(c)`

Use the existing file if present. Do not create a second config in a higher-priority location
unless the user agrees. If both a global and a project config are in use and both already list
other plugins, add the entry only where the user wants it; avoid duplicate entries.

Back up the chosen file before editing:

```powershell
Copy-Item <config> "<config>.bak-<date>"
```

```bash
cp <config> "<config>.bak-<date>"
```

## 4. Add the plugin entry

OpenCode v2 reads the **`plugins`** array. The legacy V1 key is `plugin`; do not rely on it.

Add the absolute path to the **`dist`** directory:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["<absolute-path-to-repo>/dist"]
}
```

Windows example:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["E:/CodeProjects/cc-safety-next/dist"]
}
```

If the config already has other plugins, append the entry; do not replace the array:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["existing-plugin", "<absolute-path-to-repo>/dist"],
}
```

Rules:

- Use `plugins`, not `plugin`.
- Point at the `dist` directory, not the repository root, not `dist/index.js`, and not `src/`.
- Use forward slashes on Windows. Backslashes must be escaped in JSON and are error-prone.
- An absolute path is safest. Relative paths resolve from the config file that contains them.
- If the config is JSONC, preserve its comments and trailing commas where the file already uses
  them.
- If the entry is already present, leave it alone instead of adding a duplicate.

OpenCode resolves a configured local plugin directory through its `index.*` entry. This checkout's
root has no `index.*`; its built entry is `dist/index.js`, which is why the entry must be `dist`.

### Optional: pin the shell dialect

The plugin checks the shell OpenCode actually uses. The default is `powershell` on Windows and
`posix` elsewhere. If the user's OpenCode shell differs, use the object form:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "<absolute-path-to-repo>/dist",
      "options": { "shell": "posix" }
    }
  ]
}
```

Accepted values are `posix` and `powershell`. A mismatch causes a runtime error such as:

```text
CC Safety Net: actual shell "..." does not match plugin option shell "..."
```

## 5. Restart OpenCode

Config changes to a running instance are not reliable. Restart the OpenCode client. If OpenCode is
using its background service, also run:

```bash
opencode service restart
```

Do not skip the restart before verification.

## 6. Verify

Run the following from `<repo>` or any directory:

```bash
opencode plugin list
```

Expect a row for `cc-safety-net` whose source points at:

```text
<repo>/dist/index.js
```

For a location-specific check, use the OpenCode API (adjust the path and forward slashes):

```bash
opencode api get "/api/plugin?directory=<project-absolute-path>"
```

Expect an entry with:

- `"id": "cc-safety-net"`
- `"source": { "type": "local", "path": ".../dist/index.js" }`
- `"state": { "status": "active" }`
- `"features": { "server": true, "tui": true }` when the TUI plugin is available

Then check the guard itself:

```bash
node <repo>/dist/bin/cc-safety-net.js doctor --skip-update-check
node <repo>/dist/bin/cc-safety-net.js status
node <repo>/dist/bin/cc-safety-net.js explain "git reset --hard"
```

`explain` must show a denied verdict. It exits 0 for both allowed and blocked commands, so read the
verdict in the output rather than the exit code. Do not execute the tested command.

Finally, ask the user to start a session and type `/cc-safety-net`. The command should be
available. A blocked command in a live TUI should offer "Allow once", "Allow for this session",
and "Reject".

Report installation as successful only when:

1. `opencode plugin list` shows `cc-safety-net` with its source under `dist/index.js`.
2. The API check reports `"state": { "status": "active" }`, and `doctor` does not report a missing
   or failed OpenCode integration.
3. `status` runs and reports protection.
4. `explain "git reset --hard"` denies the command.

## 7. Troubleshooting

### Plugin does not appear in `opencode plugin list`

- The config uses `plugin` instead of `plugins`. Add the entry under `plugins`.
- The entry points at the repository root. Change it to `<repo>/dist`.
- The entry points at `dist/index.js` or another file. OpenCode expects a directory for configured
  local plugins; use `<repo>/dist`.
- The config was edited in a location OpenCode does not read for this project. Check the global
  path and the project path, plus `OPENCODE_CONFIG_DIR`.
- OpenCode was not restarted.
- `node_modules` or `dist` is missing. Run `pnpm install --frozen-lockfile && pnpm run build`.

### `configured plugin path must be a directory`

The configured path is a file. Use `<repo>/dist`.

### `Plugin must export a default definition with an id and an effect or setup function`

The resolved directory has no valid V2 entrypoint. Rebuild with `pnpm run build`, then confirm
`dist/index.js` exists and the config points at `dist`. A stale or V1-only build can also produce
this error.

### `actual shell ... does not match plugin option shell ...`

Set `options.shell` to the dialect OpenCode actually uses (`posix` or `powershell`), or remove the
option to use the platform default. Do not silence the check by disabling the plugin.

### Install fails with `ERR_PNPM_IGNORED_BUILDS` or a pnpm version error

- Confirm `pnpm --version` and the `packageManager` field agree (pnpm 12.14.0).
- Do not switch to `npm install` or `bun install` to work around it.
- `pnpm-workspace.yaml` explicitly denies build scripts for `msgpackr-extract` and `protobufjs`.
  If pnpm reports a build script that is not listed there, stop and ask the user before approving
  it.

### The build fails under `bun x`

`scripts/project-bun.ts` downloads the Bun version from `.bun-version` when the running Bun does
not match. Without network access, install Bun 1.4.2 locally and re-run `pnpm run build`.

### No interactive dialog appears

- The TUI plugin may not be loaded; check `features.tui` in the API output.
- `interaction` may be `false` in `~/.cc-safety-net/settings.json`.
- `CC_SAFETY_NET_NO_INTERACTION` may be set.
- There may be no live TUI; in that case the command remains blocked by design.

### A legitimate command is blocked

Do not disable the plugin. Run:

```bash
node <repo>/dist/bin/cc-safety-net.js explain "<exact command>"
```

Then use the TUI allow action for a one-off, or adjust the policy or rulebook as appropriate. The
`/cc-safety-net` command can walk through the decision.

## 8. Uninstall

1. Back up the OpenCode config.
2. Remove the `cc-safety-net` entry from the `plugins` array.
3. Restart OpenCode and confirm `opencode plugin list` no longer shows it.
4. Only with explicit user consent, remove `~/.cc-safety-net` to delete user policy, prompts, and
   audit data. Project-level `.cc-safety-net/` is separate and belongs to the repository.

Do not delete `<repo>/dist` or `node_modules` as part of uninstalling the OpenCode integration;
they are the local checkout.
