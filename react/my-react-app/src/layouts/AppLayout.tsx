import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { NetworkStatus } from '../components/NetworkStatus'
import { RouteErrorFallback } from '../components/RouteErrorFallback'
import { RouteLoading } from '../components/RouteLoading'
import { UserMenu } from '../features/auth/components/UserMenu'
import { ThemeToggle } from '../features/preferences/components/ThemeToggle'

/*
The shared page structure
*/
export function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
{/*
        The header is shared by every page.
*/}
      <header className="app-header">
{/*
          Link is used for ordinary internal navigation., An ordinary <a> typically requests the document again and reloads the React application.
          Link updates the URL and lets React Router replace the page content without a full reload.
*/}
        <Link className="brand" to="/" aria-label="ProjectHub home">
          <span className="brand__mark">PH</span>
          <span>ProjectHub</span>
        </Link>
        <div className="header-actions">
          <NetworkStatus />
          <ThemeToggle />
          <UserMenu />
          <span className="environment-badge">Development</span>
        </div>
      </header>
      <div className="app-layout">
{/*
         aside is semantic HTML representing supporting content beside the main page content.
*/}
        <aside className="sidebar">
          <p className="sidebar__label">Workspace</p>
          <Navigation />
        </aside>

{/*
          <main> represents the page’s primary content.
*/}
        <main id="main-content" className="main-content">
            {/*
          outlet renders currently matched child page, Outlet is the position where React Router renders the matched child page.
*/}
         {/* Suspense       → component is waiting
          ErrorBoundary  → component threw an error
          TanStack Query → API request states*/}

         {/* Lazy import -> A lazy import returns a Promise:
          ├── Pending  → Suspense fallback
          ├── Resolved → Render page
          └── Rejected → Nearest ErrorBoundary fallback*/}
          <ErrorBoundary
            FallbackComponent={RouteErrorFallback}
            resetKeys={[location.pathname]}
          >
            <Suspense fallback={<RouteLoading />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
