export function RouteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <div>
        <strong>Loading page</strong>
        <p>Please wait while this section is downloaded.</p>
      </div>
    </div>
  )
}
