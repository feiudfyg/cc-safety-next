import { parseCommandArgs, reportCommandArgErrors } from '@/cli/args';
import { runLogsCommand } from '@/cli/audit-log';
import { type CommandName, findCommand } from '@/cli/commands/index';
import { parseDoctorFlags, runDoctor } from '@/cli/doctor/index';
import { runExplain } from '@/cli/explain/run';
import { printHelp, printVersion, showCommandHelp } from '@/cli/help';
import { runPolicyCommand } from '@/cli/policy/index';
import { runRuleCommand } from '@/cli/rule/index';
import { printStatus } from '@/cli/status';
import { createProcessEnvironment } from '@/core/environment';
import { ensureSettingsFile } from '@/core/settings';
import { runGuiCommand } from '@/gui/index';

function handleHelpCommand(args: readonly string[]): boolean {
  if (args[0] !== 'help') {
    return false;
  }

  const commandName = args[1];
  if (!commandName) {
    printHelp();
    process.exit(0);
  }

  if (showCommandHelp(commandName)) {
    process.exit(0);
  }

  console.error(`Unknown command: ${commandName}`);
  console.error("Run 'cc-safety-net --help' for available commands.");
  process.exit(1);
}

const commandHandlers = {
  rule: async (args) => {
    process.exit(await runRuleCommand(createProcessEnvironment(), args));
  },
  policy: async (args) => {
    process.exit(await runPolicyCommand(createProcessEnvironment(), args));
  },
  status: async (args) => {
    if (reportCommandArgErrors(parseCommandArgs({ label: 'status' }, args).errors)) {
      process.exit(1);
    }
    printStatus(createProcessEnvironment());
  },
  doctor: async (args) => {
    const flags = parseDoctorFlags(args);
    if (!flags) process.exit(1);
    const exitCode = await runDoctor(createProcessEnvironment(), {
      json: flags.json,
      skipUpdateCheck: flags.skipUpdateCheck,
    });
    process.exit(exitCode);
  },
  logs: async (args) => {
    process.exit(await runLogsCommand(createProcessEnvironment(), args));
  },
  gui: async (args) => {
    process.exit(await runGuiCommand(args));
  },
  explain: async (args) => {
    process.exit(await runExplain(createProcessEnvironment(), args));
  },
} satisfies Record<CommandName, (args: string[]) => Promise<void>>;

export async function runCli(args: readonly string[]): Promise<void> {
  ensureSettingsFile(createProcessEnvironment());
  const globalScan = parseCommandArgs(
    { label: 'cc-safety-net', booleans: { version: ['-V', '--version'] }, positionals: 'list' },
    args,
  );

  if (handleHelpCommand(args)) return;

  const commandName = args[0];
  const command = commandName ? findCommand(commandName) : undefined;

  if (globalScan.help && command && command.name !== 'rule') {
    showCommandHelp(command.name);
    process.exit(0);
  }
  if (!commandName || (globalScan.help && !command)) {
    printHelp();
    process.exit(0);
  }
  if (globalScan.flags.version) {
    printVersion();
    process.exit(0);
  }

  if (command) {
    await commandHandlers[command.name](args.slice(1));
    return;
  }

  console.error(
    commandName.startsWith('-')
      ? `Unknown option: ${commandName}`
      : `Unknown command: ${commandName}`,
  );
  console.error("Run 'cc-safety-net --help' for usage.");
  process.exit(1);
}
