import { useEffect, useRef } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'

export function RouteErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section className="route-error" role="alert" aria-labelledby="route-error-heading">
      <p className="eyebrow">Page error</p>
      <h1 id="route-error-heading" ref={headingRef} tabIndex={-1}>
        This page couldn’t be displayed
      </h1>
      <p>The rest of ProjectHub is still available. Try again or return to the dashboard.</p>

      {import.meta.env.DEV && (
        <details>
          <summary>Developer details</summary>
          <code>{errorMessage}</code>
        </details>
      )}

      <div className="route-error__actions">
          {/*resetErrorBoundary -> This clears the boundary’s error state and renders its children again.
          If the underlying error still exists, it will throw again and the fallback will return.*/}
        <button className="primary-button" type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
        <Link className="secondary-link" to="/">
          Return to dashboard
        </Link>
      </div>
    </section>
  )
}
