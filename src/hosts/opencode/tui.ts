import type { Plugin as TuiPlugin } from '@opencode/plugin/tui';
import { type Environment, createProcessEnvironment } from '@/core/environment';
import {
  clearInteraction,
  type InteractionDecision,
  type InteractionRequest,
  listInteractionRequests,
  touchTuiHeartbeat,
  writeInteractionResponse,
} from '@/core/interaction/protocol';
import { getInteractionConfig } from '@/core/settings';

type DecisionOption = {
  title: string;
  value: InteractionDecision;
  description: string;
};

/** @internal */
export type TuiUi = {
  dialog: {
    select: <Value>(options: {
      title: string;
      placeholder?: string;
      options: readonly { title: string; value: Value; description?: string }[];
    }) => Promise<Value | undefined>;
    clear: () => void;
  };
};

const STALE_MARGIN_MS = 15 * 1000;
const MAX_CALL_LENGTH = 160;

const DECISIONS: DecisionOption[] = [
  { title: 'Allow once', value: 'once', description: 'Run this command one time.' },
  {
    title: 'Allow for this session',
    value: 'session',
    description: 'Allow identical blocks until this session ends.',
  },
  { title: 'Reject', value: 'reject', description: 'Keep blocking this command.' },
];

/** @internal */
export function formatBlockedCall(request: InteractionRequest): string {
  const raw = request.command ?? request.segment ?? '';
  const singleLine = raw.replace(/\s+/g, ' ').trim();
  const shortened =
    singleLine.length > MAX_CALL_LENGTH
      ? `${singleLine.slice(0, MAX_CALL_LENGTH - 1)}…`
      : singleLine;
  return request.toolName ? `${request.toolName}: ${shortened}` : shortened;
}

/** @internal */
export function createTuiController(
  api: { ui: TuiUi },
  environment: Environment,
  pollIntervalMs = 1000,
) {
  let activeId: string | undefined;
  const decided = new Set<string>();

  const settle = (id: string, decision: InteractionDecision) => {
    if (id !== activeId || decided.has(id)) return;
    decided.add(id);
    writeInteractionResponse(environment, { id, decision });
  };

  const askUser = async (request: InteractionRequest) => {
    const call = formatBlockedCall(request);
    const decision = await api.ui.dialog.select<InteractionDecision>({
      title: request.reason,
      ...(call ? { placeholder: call } : {}),
      options: DECISIONS,
    });
    settle(request.id, decision ?? 'reject');
  };

  const clearActiveDialog = () => {
    if (activeId !== undefined) api.ui.dialog.clear();
    activeId = undefined;
    decided.clear();
  };

  const tick = () => {
    touchTuiHeartbeat(environment);
    const config = getInteractionConfig(environment);
    if (!config.enabled) {
      clearActiveDialog();
      return;
    }
    const now = Date.now();
    const next = listInteractionRequests(environment).filter((request) => {
      if (now - request.createdAt <= config.timeoutMs + STALE_MARGIN_MS) return true;
      clearInteraction(environment, request.id);
      return false;
    })[0];
    if (!next) {
      clearActiveDialog();
      return;
    }
    if (activeId === next.id || decided.has(next.id)) return;
    activeId = next.id;
    void askUser(next);
  };

  tick();
  const timer = setInterval(tick, pollIntervalMs);
  return {
    tick,
    dispose: () => {
      clearInterval(timer);
      clearActiveDialog();
    },
  };
}

export function createCCSafetyNetTuiPlugin(pollIntervalMs = 1000): TuiPlugin.Definition {
  return {
    id: 'cc-safety-net',
    setup(ctx) {
      const controller = createTuiController(ctx, createProcessEnvironment(), pollIntervalMs);
      return controller.dispose;
    },
  };
}
