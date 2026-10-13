import { randomUUID } from 'node:crypto';
import { join, resolve } from 'node:path';
import {
  type CwdDenial,
  createCwdDenial,
  createFailedClosedDenial,
  formatDenial,
  type IntegrationDenial,
  projectGuardDenial,
} from '@/core/denial';
import { createProcessEnvironment } from '@/core/environment';
import {
  clearInteraction,
  type InteractionDecision,
  isTuiAlive,
  waitForInteractionDecision,
  writeInteractionRequest,
} from '@/core/interaction/protocol';
import {
  createSessionAllow,
  interactionIdentity,
  type SessionAllow,
} from '@/core/interaction/session-allow';
import { type BlockPrompts, DEFAULT_BLOCK_PROMPTS } from '@/core/prompts/block';
import { shouldRecordAllowedCommands } from '@/core/policy/env';
import { getInteractionConfig } from '@/core/settings';
import { getCommandFromToolInput, ToolInputLimitError } from '@/core/tool-input';
import { isUsableDirectory } from '@/gate/intake';
import {
  type CommandToolKind,
  createToolInvocation,
  type ToolCallContext,
  type ToolRoute,
} from '@/gate/invocation';
import { type GuardDependencies, GuardEvaluationError } from '@/gate/pipeline';
import { writeIntegrationDenialAudit } from '@/hosts/audit';
import { describeBlockReason } from '@/hosts/opencode/block-reason';
import { evaluateRuntimeGuard } from '@/hosts/runtime';

const POWERSHELL_EXECUTABLES = new Set(['powershell', 'pwsh']);
const POSIX_EXECUTABLES = new Set(['bash', 'dash', 'ksh', 'sh', 'zsh']);
const TUI_HEARTBEAT_MAX_AGE_MS = 15_000;
const INTERACTION_POLL_MS = 250;

function createEnvironment(homeDir: string | undefined) {
  return homeDir === undefined
    ? createProcessEnvironment()
    : { ...createProcessEnvironment(), home: homeDir };
}

export async function evaluateOpenCodeTool({
  configCwd,
  homeDir,
  expandHomeWorkdir = false,
  tool,
  sessionID,
  toolInput,
  route,
  blockPrompts = DEFAULT_BLOCK_PROMPTS,
  sessionAllow = createSessionAllow(),
  guardDependencies = {},
}: {
  configCwd: string;
  homeDir?: string;
  expandHomeWorkdir?: boolean;
  tool: string;
  sessionID: string;
  toolInput: unknown;
  route: ToolRoute;
  blockPrompts?: BlockPrompts;
  sessionAllow?: SessionAllow;
  guardDependencies?: Partial<GuardDependencies>;
}): Promise<void> {
  const environment = createEnvironment(homeDir);

  const resolveInteraction = async (denial: IntegrationDenial): Promise<void> => {
    const { enabled, timeoutMs } = getInteractionConfig(environment);
    if (!enabled || !isTuiAlive(environment, TUI_HEARTBEAT_MAX_AGE_MS)) {
      throwBlocked(denial, blockPrompts);
    }
    const identity = interactionIdentity(denial);
    if (sessionAllow.isAllowed(sessionID, identity)) return;
    const id = randomUUID();
    writeInteractionRequest(environment, {
      id,
      sessionID,
      reason: describeBlockReason(denial),
      createdAt: Date.now(),
      toolName: denial.toolName,
      command: denial.command,
      segment: denial.segment,
      ruleId: denial.ruleId,
      cwd: denial.cwd,
    });
    let decision: InteractionDecision | undefined;
    try {
      decision = await waitForInteractionDecision(environment, id, {
        timeoutMs,
        pollMs: INTERACTION_POLL_MS,
        maxAgeMs: TUI_HEARTBEAT_MAX_AGE_MS,
      });
    } finally {
      clearInteraction(environment, id);
    }
    if (decision === 'once') return;
    if (decision === 'session') {
      sessionAllow.allow(sessionID, identity);
      return;
    }
    throwBlocked(denial, blockPrompts);
  };

  const denyPreflight = async (
    denial: IntegrationDenial,
    toolName?: string,
    cwd: string | null = configCwd,
  ): Promise<void> => {
    writeIntegrationDenialAudit(environment, denial, () => sessionID, {
      agent: 'opencode',
      toolName,
      cwd,
    });
    await resolveInteraction(denial);
  };

  if (typeof tool !== 'string' || tool.trim() === '') {
    await denyPreflight(createFailedClosedDenial());
    return;
  }

  let command: string | undefined;
  try {
    command = getCommandFromToolInput(toolInput);
  } catch (error) {
    if (!(error instanceof ToolInputLimitError)) throw error;
    await denyPreflight(createFailedClosedDenial({ toolName: tool }), tool);
    return;
  }
  if (!isUsableDirectory(configCwd)) {
    await denyPreflight(
      createCwdDenial(
        { directory: 'session', problem: 'unusable', cwd: configCwd },
        { command, toolName: tool },
      ),
      tool,
    );
    return;
  }
  const executionCwd = resolveOpenCodeExecutionCwd(
    configCwd,
    toolInput,
    expandHomeWorkdir ? environment.home : undefined,
  );
  if (executionCwd === null) {
    await denyPreflight(createFailedClosedDenial({ command, toolName: tool }), tool);
    return;
  }
  if (typeof executionCwd !== 'string') {
    await denyPreflight(
      createCwdDenial(executionCwd, { command, toolName: tool }),
      tool,
      executionCwd.cwd,
    );
    return;
  }
  const context: ToolCallContext = { configCwd, executionCwd };
  const invocation = createToolInvocation(tool, toolInput, route, context, command ?? null);
  try {
    const evaluation = evaluateRuntimeGuard(environment, invocation, {
      guard: {
        auditAllowed: shouldRecordAllowedCommands(environment.env),
        dependencies: guardDependencies,
      },
      audit: {
        agent: 'opencode',
        getSessionId: () => sessionID,
      },
    });
    const denial = projectGuardDenial(evaluation, { includeEvidence: true });
    if (denial) await resolveInteraction(denial);
  } catch (error) {
    if (!(error instanceof GuardEvaluationError)) throw error;
    if (
      error.stage === 'policy-protection' ||
      error.stage === 'config-load' ||
      error.stage === 'secret-protection'
    ) {
      throw error.cause;
    }
    const denial = projectGuardDenial(error.evaluation, { includeEvidence: true });
    if (denial) await resolveInteraction(denial);
    return;
  }
}

export function resolveOpenCodeShellRoute(
  configuredShell: unknown,
  platform = process.platform,
  environmentShell = process.env.SHELL,
): CommandToolKind {
  if (typeof configuredShell !== 'string' && platform === 'win32') return 'powershell';
  const candidate = typeof configuredShell === 'string' ? configuredShell : environmentShell;
  if (typeof candidate !== 'string') return 'auto';
  const executable = candidate
    .trim()
    .split(/[\\/]/)
    .at(-1)
    ?.toLowerCase()
    .replace(/\.exe$/, '');
  if (!executable) return 'auto';
  if (POWERSHELL_EXECUTABLES.has(executable)) return 'powershell';
  if (POSIX_EXECUTABLES.has(executable)) return 'posix';
  return 'auto';
}

function resolveOpenCodeExecutionCwd(
  configCwd: string,
  toolInput: unknown,
  workdirHome: string | undefined,
): string | CwdDenial | null {
  if (!toolInput || typeof toolInput !== 'object' || Array.isArray(toolInput)) return configCwd;
  if (!Object.hasOwn(toolInput, 'workdir')) return configCwd;

  const workdir = (toolInput as Record<string, unknown>).workdir;
  if (typeof workdir !== 'string' || workdir.trim() === '') return null;
  const normalizedWorkdir =
    process.platform === 'win32' ? normalizeOpenCodeWindowsWorkdir(workdir) : workdir;
  const isHomeRelative =
    normalizedWorkdir.startsWith('~/') ||
    (process.platform === 'win32' && normalizedWorkdir.startsWith('~\\'));
  const hostWorkdir =
    workdirHome === undefined
      ? normalizedWorkdir
      : normalizedWorkdir === '~'
        ? workdirHome
        : isHomeRelative
          ? join(workdirHome, normalizedWorkdir.slice(2))
          : normalizedWorkdir;

  const executionCwd = resolve(configCwd, hostWorkdir);
  return isUsableDirectory(executionCwd)
    ? executionCwd
    : { directory: 'requested', problem: 'unusable', cwd: workdir };
}

/** @internal */
export function normalizeOpenCodeWindowsWorkdir(workdir: string): string {
  const normalized = workdir
    .replace(/^\/([a-zA-Z]):(?:[\\/]|$)/, (_, drive: string) => `${drive.toUpperCase()}:/`)
    .replace(/^\/([a-zA-Z])(?:[\\/]|$)/, (_, drive: string) => `${drive.toUpperCase()}:/`)
    .replace(/^\/cygdrive\/([a-zA-Z])(?:[\\/]|$)/, (_, drive: string) => `${drive.toUpperCase()}:/`)
    .replace(/^\/mnt\/([a-zA-Z])(?:[\\/]|$)/, (_, drive: string) => `${drive.toUpperCase()}:/`);

  return normalized;
}

function throwBlocked(denial: IntegrationDenial, prompts: BlockPrompts): never {
  throw new Error(formatDenial(denial, prompts));
}
