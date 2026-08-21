import { createContext } from 'react'
import type { ShowToastInput, Toast } from '../types/notification'

export type ToastActions = {
  dismissToast: (toastId: string) => void
  showToast: (toast: ShowToastInput) => string
}

export const ToastStateContext = createContext<Toast[] | null>(null)
export const ToastActionsContext = createContext<ToastActions | null>(null)
