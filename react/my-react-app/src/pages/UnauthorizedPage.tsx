import { Link, useLocation } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type UnauthorizedLocationState = {
  from?: unknown
}

export function UnauthorizedPage() {
  useDocumentTitle('Access denied | ProjectHub')
  const location = useLocation()
  const state = location.state as UnauthorizedLocationState | null
  const requestedPage = typeof state?.from === 'string' ? state.from : null

  return (
    <section className="route-error authorization-error" aria-labelledby="unauthorized-heading">
      <p className="eyebrow">403 · Permission required</p>
      <h1 id="unauthorized-heading">You don’t have access</h1>
      <p>
        This action is available only to administrators.
        {requestedPage && <> The blocked address was <code>{requestedPage}</code>.</>}
      </p>
      <div className="route-error__actions">
        <Link className="primary-link" to="/posts">Return to posts</Link>
        <Link className="secondary-link" to="/">Go to dashboard</Link>
      </div>
    </section>
  )
}
