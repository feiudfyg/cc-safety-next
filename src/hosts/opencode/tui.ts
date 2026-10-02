import { createProcessEnvironment } from '@/core/environment';
import { dangerLabel, dangerToastVariant } from '@/core/interaction/danger';
import {
  type InteractionDecision,
  type InteractionRequest,
  listInteractionRequests,
  touchTuiHeartbeat,
  writeInteractionResponse,
} from '@/core/interaction/protocol';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

type DialogOption = {
  title: string;
  value: InteractionDecision;
  description?: string;
};

type TuiApi = {
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
      onClose?: () => void;
    }) => unknown;
  };
  lifecycle?: {
    onDispose?: (fn: () => void) => void;
  };
};

export function createCCSafetyNetTuiPlugin(pollIntervalMs = 1000) {
  return async (api: TuiApi): Promise<void> => {
    const environment = createProcessEnvironment();
    let shown: string | undefined;

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
            options: [
              { title: '单次放行', value: 'once', description: '只允许这一次操作' },
              {
                title: '本次会话放行',
                value: 'session',
                description: '本会话内相同的拦截不再询问',
              },
              { title: '拒绝', value: 'reject', description: '维持拦截' },
            ],
            onSelect: (option) => {
              writeInteractionResponse(environment, { id: request.id, decision: option.value });
              api.ui.dialog.clear();
              shown = undefined;
            },
            onClose: () => {
              shown = undefined;
            },
          }),
        () => {
          shown = undefined;
        },
      );
    };

    const tick = () => {
      touchTuiHeartbeat(environment);
      const next = listInteractionRequests(environment)[0];
      if (!next) {
        shown = undefined;
        return;
      }
      if (shown === next.id) return;
      shown = next.id;
      askUser(next);
    };

    tick();
    const timer = setInterval(tick, pollIntervalMs);
    api.lifecycle?.onDispose?.(() => clearInterval(timer));
  };
}
