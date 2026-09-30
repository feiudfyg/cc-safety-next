import { doctorCommand } from './doctor';
import { explainCommand } from './explain';
import { guiCommand } from './gui';
import { logsCommand } from './logs';
import { policyCommand } from './policy';
import { ruleCommand } from './rule';
import { statusCommand } from './status';
import type { Command } from './types';

export type { Command } from './types';

export const commands = [
  statusCommand,
  doctorCommand,
  logsCommand,
  explainCommand,
  ruleCommand,
  policyCommand,
  guiCommand,
] as const satisfies readonly Command[];

export type CommandName = (typeof commands)[number]['name'];
type RegisteredCommand = Command & { name: CommandName };

function getCommandAliases(command: Command): readonly string[] {
  return command.aliases ?? [];
}

export function findCommand(nameOrAlias: string): RegisteredCommand | undefined {
  const normalized = nameOrAlias.toLowerCase();
  return commands.find(
    (cmd) =>
      cmd.name.toLowerCase() === normalized ||
      getCommandAliases(cmd).some((alias) => alias.toLowerCase() === normalized),
  );
}
