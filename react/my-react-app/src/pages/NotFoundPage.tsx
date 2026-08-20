import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="placeholder" aria-labelledby="not-found-heading">
      <p className="eyebrow">404 error</p>
      <h1 id="not-found-heading">Page not found</h1>
      <p>The address does not match a page in ProjectHub.</p>
      <Link className="text-link" to="/">Return to dashboard</Link>
    </section>
  )
}
