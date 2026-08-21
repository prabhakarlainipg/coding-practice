import { useToast, useToastState } from '../hooks/useToast'

export function ToastViewport() {
  const toasts = useToastState()
  const { dismissToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-viewport" aria-label="Notifications">
      {toasts.map((toast) => (
        <article
          className={`toast toast--${toast.variant}`}
          key={toast.id}
          role={toast.variant === 'error' ? 'alert' : 'status'}
        >
          <div>
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>
          <button
            type="button"
            aria-label={`Dismiss ${toast.title} notification`}
            onClick={() => dismissToast(toast.id)}
          >
            ×
          </button>
        </article>
      ))}
    </div>
  )
}
