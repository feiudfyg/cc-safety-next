import { Plugin } from '@opencode/plugin';
import { createProcessEnvironment } from '@/core/environment';
import { createSessionAllow } from '@/core/interaction/session-allow';
import { loadBlockPrompts } from '@/core/prompts/block';
import { ensureSettingsFile } from '@/core/settings';
import { getNonCommandToolInputKind } from '@/core/tool-input';
import { loadBuiltinCommands } from './builtin-commands/commands';
import { evaluateOpenCodeTool, resolveOpenCodeShellRoute } from './plugin';

export function createOpenCodePlugin() {
  return Plugin.define({
    id: 'cc-safety-net',
    async setup(ctx) {
      const environment = createProcessEnvironment();
      ensureSettingsFile(environment);
      const blockPrompts = loadBlockPrompts(environment);
      const sessionAllow = createSessionAllow();
      const shell = ctx.options.shell ?? (process.platform === 'win32' ? 'powershell' : 'posix');
      if (shell !== 'posix' && shell !== 'powershell') {
        throw new Error('CC Safety Net: plugin option shell must be posix or powershell.');
      }

      await ctx.tool.hook('execute.before', async (event) => {
        await evaluateOpenCodeTool({
          configCwd: ctx.location.directory,
          expandHomeWorkdir: true,
          tool: event.tool,
          sessionID: event.sessionID,
          toolInput: event.input,
          route:
            event.tool === 'shell'
              ? { kind: 'command', shell }
              : { kind: getNonCommandToolInputKind(event.tool) },
          blockPrompts,
          sessionAllow,
        });
      });

      await ctx.shell.hook('create.before', (event) => {
        if (resolveOpenCodeShellRoute(event.shell) === shell) return;
        throw new Error(
          `CC Safety Net: actual shell "${event.shell}" does not match plugin option shell "${shell}". Configure the plugin's shell option to match OpenCode; supported dialects are posix and powershell.`,
        );
      });

      const commands = await ctx.command.list();
      if (commands.data.some((command) => command.name === 'cc-safety-net')) return;
      await ctx.command.transform((editor) => {
        const command = loadBuiltinCommands(environment)['cc-safety-net'];
        if (!command) return;
        editor.add({
          name: 'cc-safety-net',
          description: command.description,
          execute: async (input) => {
            await ctx.session.prompt({
              // oxlint-disable-next-line typescript/no-misused-spread -- forwarded as data; OpenCode reads the prompt's fields, never its prototype.
              ...input.prompt,
              sessionID: input.sessionID,
              delivery: input.delivery,
              text: `${command.template}\n\n${input.prompt.text}`,
            });
          },
        });
      });
    },
  });
}
