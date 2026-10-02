declare const _default: {
    id: string;
    tui: (api: {
        ui: {
            toast: (input: {
                variant?: "error" | "info" | "success" | "warning";
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
                options: {
                    title: string;
                    value: import("../core/interaction/protocol").InteractionDecision;
                    description?: string;
                }[];
                onSelect?: (option: {
                    title: string;
                    value: import("../core/interaction/protocol").InteractionDecision;
                    description?: string;
                }) => void;
                onClose?: () => void;
            }) => unknown;
        };
        lifecycle?: {
            onDispose?: (fn: () => void) => void;
        };
    }) => Promise<void>;
};
export default _default;
