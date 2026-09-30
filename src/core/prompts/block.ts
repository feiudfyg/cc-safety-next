import type { BlockIntent } from '@/core/decision';
import type { Environment } from '@/core/environment';
import { loadPrompt } from '@/core/prompts/store';

/** @internal */
export type CwdDirectory = 'session' | 'requested';
/** @internal */
export type CwdProblem = 'unusable' | 'outside-workspace';

/** @internal */
export interface BlockPrompts {
  blockedHeader: string;
  unverifiedHeader: string;
  footers: Record<BlockIntent, string>;
  cwdReasons: Record<CwdDirectory, Record<CwdProblem, string>>;
}

/** @internal */
export const DEFAULT_BLOCK_PROMPTS: BlockPrompts = {
  blockedHeader: 'BLOCKED by CC Safety Net',
  unverifiedHeader: 'CC Safety Net could not verify this command',
  footers: {
    hard_stop:
      'Do not retry this operation or attempt any workaround (other tools, flags, or paths). Report the block to the user and continue with the rest of the task.',
    use_alternative:
      'Do not retry the blocked form. Continue the task using the safer alternative described above.',
    scope_down:
      'Retry with a narrower, explicit target as described above. Escalate to the user if the broad operation is truly required.',
    manual_only:
      'If this operation is truly needed, ask the user for explicit permission and have them run the command manually.',
    stop_and_explain:
      'Do not brute-force variants. Simplify or restructure the command so it can be analyzed, or report the block to the user.',
  },
  cwdReasons: {
    session: {
      unusable:
        "CC Safety Net cannot check tool calls because the session's working directory or workspace root no longer exists, is inaccessible, is not a directory, or uses an unsupported path form. Ask the user to restart the session from an existing directory.",
      'outside-workspace':
        "CC Safety Net cannot check tool calls because the session's working directory is outside its workspace roots. Ask the user to restart the session from a directory inside the workspace.",
    },
    requested: {
      unusable:
        'CC Safety Net could not use the requested working directory because it does not exist, is inaccessible, is not a directory, or uses an unsupported path form. Use an existing accessible working directory. If the requested directory is missing, create it from an accessible location before retrying the command.',
      'outside-workspace':
        "CC Safety Net could not use the requested working directory because it is outside the session's workspace. Use a working directory inside the workspace.",
    },
  },
};

const FOOTER_NAMES: Record<BlockIntent, string> = {
  hard_stop: 'footer-hard-stop',
  use_alternative: 'footer-use-alternative',
  scope_down: 'footer-scope-down',
  manual_only: 'footer-manual-only',
  stop_and_explain: 'footer-stop-and-explain',
};

const CWD_REASON_NAMES: Record<CwdDirectory, Record<CwdProblem, string>> = {
  session: {
    unusable: 'cwd-session-unusable',
    'outside-workspace': 'cwd-session-outside-workspace',
  },
  requested: {
    unusable: 'cwd-requested-unusable',
    'outside-workspace': 'cwd-requested-outside-workspace',
  },
};

export function loadBlockPrompts(environment: Environment): BlockPrompts {
  const footer = (intent: BlockIntent) =>
    loadPrompt(environment, FOOTER_NAMES[intent], DEFAULT_BLOCK_PROMPTS.footers[intent]);
  const cwdReason = (directory: CwdDirectory, problem: CwdProblem) =>
    loadPrompt(
      environment,
      CWD_REASON_NAMES[directory][problem],
      DEFAULT_BLOCK_PROMPTS.cwdReasons[directory][problem],
    );
  return {
    blockedHeader: loadPrompt(environment, 'blocked-header', DEFAULT_BLOCK_PROMPTS.blockedHeader),
    unverifiedHeader: loadPrompt(
      environment,
      'unverified-header',
      DEFAULT_BLOCK_PROMPTS.unverifiedHeader,
    ),
    footers: {
      hard_stop: footer('hard_stop'),
      use_alternative: footer('use_alternative'),
      scope_down: footer('scope_down'),
      manual_only: footer('manual_only'),
      stop_and_explain: footer('stop_and_explain'),
    },
    cwdReasons: {
      session: {
        unusable: cwdReason('session', 'unusable'),
        'outside-workspace': cwdReason('session', 'outside-workspace'),
      },
      requested: {
        unusable: cwdReason('requested', 'unusable'),
        'outside-workspace': cwdReason('requested', 'outside-workspace'),
      },
    },
  };
}
