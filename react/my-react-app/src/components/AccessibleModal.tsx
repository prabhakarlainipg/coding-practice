import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type AccessibleModalProps = {
  isOpen: boolean
  title: string
  children: ReactNode
  isDismissible?: boolean
  onClose: () => void
}

export function AccessibleModal({
  isOpen,
  title,
  children,
  isDismissible = true,
  onClose,
}: AccessibleModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const isDismissibleRef = useRef(isDismissible)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    isDismissibleRef.current = isDismissible
    onCloseRef.current = onClose
  }, [isDismissible, onClose])

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocusedElement = document.activeElement as HTMLElement | null
    //Before changing overflow, we save its previous value:
    const previousOverflow = document.body.style.overflow
    //overflow: hidden prevents content outside the body’s visible area from scrolling.
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    const firstFocusableElement = dialog?.querySelector<HTMLElement>(focusableSelector)
    const elementToFocus = firstFocusableElement ?? dialog
    elementToFocus?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isDismissibleRef.current) {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      )
      const firstElement = focusableElements.at(0)
      const lastElement = focusableElements.at(-1)

      if (!firstElement || !lastElement) {
        event.preventDefault()
        dialogRef.current.focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocusedElement?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && isDismissible) onClose()
      }}
    >
      <div
        className="modal-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  )
}
