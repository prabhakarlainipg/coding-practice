import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import { ToastActionsContext, ToastStateContext, type ToastActions } from './ToastContext'
import { toastReducer } from './toastReducer'
import type { ShowToastInput } from '../types/notification'

const DEFAULT_TOAST_DURATION = 4500

type ToastProviderProps = {
  children: ReactNode
}

function createToastId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, [])
  const dismissalTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismissToast = useCallback((toastId: string) => {
    const timer = dismissalTimers.current.get(toastId)
    if (timer) clearTimeout(timer)
    dismissalTimers.current.delete(toastId)
    dispatch({ type: 'toastDismissed', toastId })
  }, [])

  const showToast = useCallback((input: ShowToastInput) => {
    const id = createToastId()
    const { duration = DEFAULT_TOAST_DURATION, ...toast } = input

    dispatch({ type: 'toastAdded', toast: { id, ...toast } })

    if (duration > 0) {
      const timer = setTimeout(() => {
        dismissalTimers.current.delete(id)
        dispatch({ type: 'toastDismissed', toastId: id })
      }, duration)
      dismissalTimers.current.set(id, timer)
    }

    return id
  }, [])

  useEffect(() => {
    const timers = dismissalTimers.current
    return () => timers.forEach(clearTimeout)
  }, [])

  const actions = useMemo<ToastActions>(
    () => ({ dismissToast, showToast }),
    [dismissToast, showToast],
  )

  return (
    <ToastStateContext.Provider value={toasts}>
      <ToastActionsContext.Provider value={actions}>
        {children}
      </ToastActionsContext.Provider>
    </ToastStateContext.Provider>
  )
}
