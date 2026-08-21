import type { Toast } from '../types/notification'

export type ToastAction =
  | { type: 'toastAdded'; toast: Toast }
  | { type: 'toastDismissed'; toastId: string }

const MAX_VISIBLE_TOASTS = 4

export function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'toastAdded':
      return [...state, action.toast].slice(-MAX_VISIBLE_TOASTS)
    case 'toastDismissed':
      return state.filter((toast) => toast.id !== action.toastId)
  }
}
