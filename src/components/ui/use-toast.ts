import * as React from 'react';

// Interfaces:
import type { ToastProps, ToastActionElement } from '@/components/ui/toast';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 10_000;

/**
 * Um toast completo com ID e callbacks internos
 */
export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const;

// contador simples para gerar IDs únicos
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// estados e timeouts
interface State {
  toasts: ToasterToast[];
}
let memoryState: State = { toasts: [] };
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
type Action = {
  type: keyof typeof actionTypes;
  toast?: ToasterToast;
  toastId?: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST': {
      const toast = action.toast!;
      // agenda remoção automática após TOAST_REMOVE_DELAY
      const timeout = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', toastId: toast.id });
        toastTimeouts.delete(toast.id);
      }, TOAST_REMOVE_DELAY);
      toastTimeouts.set(toast.id, timeout);

      return {
        ...state,
        toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast! } : t
        )
      };

    case 'DISMISS_TOAST': {
      // simplesmente fecha, anima saída
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        )
      };
    }

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };

    default:
      return state;
  }
};

// lista de listeners (quem chama setState)
const listeners: Array<(state: State) => void> = [];

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  for (const listener of listeners) {
    listener(memoryState);
  }
}

export function toast(props: Omit<ToasterToast, 'id'>) {
  const id = genId();

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id: id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dispatch({ type: 'DISMISS_TOAST', toastId: id });
      }
    }
  });

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (updateProps: Partial<ToasterToast>) =>
      dispatch({ type: 'UPDATE_TOAST', toast: { ...updateProps, id } })
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId })
  };
}
