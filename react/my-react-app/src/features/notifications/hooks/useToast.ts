import { useContext } from 'react'
import { ToastActionsContext, ToastStateContext } from '../context/ToastContext'

export function useToast() {
  const actions = useContext(ToastActionsContext)

  if (!actions) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return actions
}

export function useToastState() {
  const toasts = useContext(ToastStateContext)

  if (!toasts) {
    throw new Error('useToastState must be used within ToastProvider')
  }

  return toasts
}
