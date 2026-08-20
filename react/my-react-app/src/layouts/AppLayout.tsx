import { Link, Outlet } from 'react-router-dom'
import { Navigation } from '../components/Navigation'

/*
The shared page structure
*/
export function AppLayout() {
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
        <span className="environment-badge">Development</span>
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
          <Outlet />
        </main>
      </div>
    </div>
  )
}
