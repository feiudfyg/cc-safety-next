import { type Environment, createProcessEnvironment } from '@/core/environment';
import { dangerLabel, dangerToastVariant } from '@/core/interaction/danger';
import {
  clearInteraction,
  type InteractionDecision,
  type InteractionRequest,
  listInteractionRequests,
  touchTuiHeartbeat,
  writeInteractionResponse,
} from '@/core/interaction/protocol';
import { getInteractionConfig } from '@/core/settings';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

type DialogOption = {
  title: string;
  value: InteractionDecision;
  description?: string;
};

/** @internal */
export type TuiApi = {
  ui: {
    toast: (input: {
      variant?: ToastVariant;
      title?: string;
      message: string;
      duration?: number;
    }) => void;
    dialog: {
      replace: (render: () => unknown, onClose?: () => void) => void;
      clear: () => void;
    };
    DialogSelect: (props: {
      title: string;
      placeholder?: string;
      options: DialogOption[];
      onSelect?: (option: DialogOption) => void;
    }) => unknown;
  };
  lifecycle?: {
    onDispose?: (fn: () => void) => void;
  };
};

const STALE_MARGIN_MS = 15 * 1000;

const DECISIONS: DialogOption[] = [
  { title: '单次放行', value: 'once', description: '只允许这一次操作' },
  { title: '本次会话放行', value: 'session', description: '本会话内相同的拦截不再询问' },
  { title: '拒绝', value: 'reject', description: '维持拦截' },
];

/** @internal */
export function createTuiController(api: TuiApi, environment: Environment, pollIntervalMs = 1000) {
  let activeId: string | undefined;
  const decided = new Set<string>();

  const settle = (id: string, decision: InteractionDecision) => {
    if (id !== activeId || decided.has(id)) return;
    decided.add(id);
    writeInteractionResponse(environment, { id, decision });
    api.ui.dialog.clear();
  };

  const askUser = (request: InteractionRequest) => {
    api.ui.toast({
      variant: dangerToastVariant(request.danger),
      title: `CC Safety Net · ${dangerLabel(request.danger)}`,
      message: request.command ?? request.reason,
      duration: 8000,
    });
    api.ui.dialog.replace(
      () =>
        api.ui.DialogSelect({
          title: `CC Safety Net 拦截 · ${dangerLabel(request.danger)}`,
          placeholder: request.reason,
          options: DECISIONS,
          onSelect: (option) => settle(request.id, option.value),
        }),
      () => settle(request.id, 'reject'),
    );
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
    if (activeId === next.id) return;
    activeId = next.id;
    askUser(next);
  };

  tick();
  const timer = setInterval(tick, pollIntervalMs);
  return { tick, dispose: () => clearInterval(timer) };
}

export function createCCSafetyNetTuiPlugin(pollIntervalMs = 1000) {
  return async (api: TuiApi): Promise<void> => {
    const controller = createTuiController(api, createProcessEnvironment(), pollIntervalMs);
    api.lifecycle?.onDispose?.(controller.dispose);
  };
}
