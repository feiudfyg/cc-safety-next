import { REASON_SAFETY_NET_FAILED_CLOSED } from './budget';
import type { BlockIntent, Decision } from './decision';
import {
  type BlockPrompts,
  type CwdDirectory,
  type CwdProblem,
  DEFAULT_BLOCK_PROMPTS,
} from './prompts/block';
import { redactSecrets } from './redaction';

/** @internal */
export interface FormatBlockedMessageInput {
  reason: string;
  ruleId?: string;
  intent?: BlockIntent;
  command?: string;
  segment?: string;
  toolName?: string;
  cwd?: string;
  maxLen?: number;
  redact?: (text: string) => string;
  configWarning?: string;
  askUser?: boolean;
  prompts?: BlockPrompts;
}

/** @internal */
export function formatBlockedMessage(input: FormatBlockedMessageInput): string {
  const maxLen = input.maxLen ?? 200;
  const prompts = input.prompts ?? DEFAULT_BLOCK_PROMPTS;
  const redact = input.redact ?? ((text: string) => text);
  const excerpt = (text: string) => (text.length > maxLen ? `${text.slice(0, maxLen)}...` : text);

  return [
    input.askUser ? prompts.unverifiedHeader : prompts.blockedHeader,
    `Reason: ${redact(input.reason)}`,
    input.ruleId ? `Rule: ${input.ruleId}` : undefined,
    input.toolName ? `Tool: ${input.toolName}` : undefined,
    input.command ? `Command: ${excerpt(redact(input.command))}` : undefined,
    input.segment && input.segment !== input.command
      ? `Segment: ${excerpt(redact(input.segment))}`
      : undefined,
    input.cwd ? `Working directory: ${excerpt(redact(input.cwd))}` : undefined,
    input.configWarning ? `Config warning: ${redact(input.configWarning)}` : undefined,
    input.askUser
      ? 'Approve only if you expected this command.'
      : prompts.footers[input.intent ?? 'manual_only'],
  ]
    .filter((line): line is string => line !== undefined)
    .join('\n\n');
}

export type IntegrationDenial = {
  reason: string;
  ruleId?: string;
  intent?: BlockIntent;
  command?: string;
  segment?: string;
  toolName?: string;
  cwd?: string;

  configWarning?: string;
  unverifiedByStandardMode?: true;
};

export function projectGuardDenial(
  evaluation: { decision: Decision; configFallback?: { reason: string } },
  options: { includeEvidence: boolean; toolName?: string },
): IntegrationDenial | undefined {
  if (evaluation.decision.kind !== 'deny') return undefined;
  const evidence = options.includeEvidence ? evaluation.decision.evidence : undefined;
  return {
    reason: evaluation.decision.reason,
    ruleId: evaluation.decision.ruleId,
    intent: evaluation.decision.intent,
    command: evidence?.command,
    segment: evidence?.segment,
    toolName: options.toolName,

    ...(evaluation.configFallback ? { configWarning: evaluation.configFallback.reason } : {}),
    ...(evaluation.decision.unverifiedByStandardMode
      ? { unverifiedByStandardMode: true as const }
      : {}),
  };
}

export function createFailedClosedDenial(
  options: Pick<IntegrationDenial, 'command' | 'segment' | 'toolName'> = {},
): IntegrationDenial {
  return {
    reason: REASON_SAFETY_NET_FAILED_CLOSED,
    intent: 'stop_and_explain',
    command: options.command,
    segment: options.segment ?? options.command,
    toolName: options.toolName,
  };
}

const CWD_INTENTS: Record<CwdDirectory, Record<CwdProblem, BlockIntent>> = {
  session: {
    unusable: 'hard_stop',
    'outside-workspace': 'hard_stop',
  },
  requested: {
    unusable: 'use_alternative',
    'outside-workspace': 'use_alternative',
  },
};

export type { CwdDirectory, CwdProblem };

export type CwdDenial = {
  directory: CwdDirectory;
  problem: CwdProblem;
  cwd: string;
};

export function createCwdDenial(
  cause: CwdDenial,
  options: Pick<IntegrationDenial, 'command' | 'toolName'> = {},
  prompts: BlockPrompts = DEFAULT_BLOCK_PROMPTS,
): IntegrationDenial {
  return {
    reason: prompts.cwdReasons[cause.directory][cause.problem],
    intent: CWD_INTENTS[cause.directory][cause.problem],
    command: options.command,
    toolName: options.toolName,
    cwd: cause.cwd,
  };
}

export function formatDenial(
  denial: IntegrationDenial,
  prompts: BlockPrompts = DEFAULT_BLOCK_PROMPTS,
): string {
  return formatBlockedMessage({ ...denial, redact: redactSecrets, prompts });
}

export function formatAskPrompt(
  denial: IntegrationDenial,
  prompts: BlockPrompts = DEFAULT_BLOCK_PROMPTS,
): string {
  return formatBlockedMessage({ ...denial, redact: redactSecrets, askUser: true, prompts });
}

export function formatIntegrationError(cause: unknown): string {
  return redactSecrets(cause instanceof Error ? cause.message : String(cause));
}
