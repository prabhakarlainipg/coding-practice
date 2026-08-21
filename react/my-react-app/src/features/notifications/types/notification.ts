export type ToastVariant = 'success' | 'error' | 'info'

export type Toast = {
  id: string
  message: string
  title: string
  variant: ToastVariant
}

export type ShowToastInput = Omit<Toast, 'id'> & {
  duration?: number
}
