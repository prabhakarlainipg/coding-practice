import { useState } from 'react'
import './App.css'

type NavigationItem = {
  id: 'dashboard' | 'posts' | 'users' | 'todos'
  label: string
  description: string
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Application overview' },
  { id: 'posts', label: 'Posts', description: 'Read and manage posts' },
  { id: 'users', label: 'Users', description: 'Browse user profiles' },
  { id: 'todos', label: 'Todos', description: 'Track user tasks' },
]

type NavigationProps = {
  activeItem: NavigationItem['id']
  onItemChange: (item: NavigationItem['id']) => void
}

function Navigation({ activeItem, onItemChange }: NavigationProps) {
  return (
    <nav aria-label="Primary navigation" className="navigation">
      <ul className="navigation__list">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              aria-current={activeItem === item.id ? 'page' : undefined}
              className="navigation__button"
              onClick={() => onItemChange(item.id)}
              type="button"
            >
              <span>{item.label}</span>
              <small>{item.description}</small>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Dashboard() {
  return (
    <section aria-labelledby="dashboard-heading" className="dashboard">
      <div className="dashboard__heading">
        <div>
          <p className="eyebrow">Learning workspace</p>
          <h2 id="dashboard-heading">React Production Lab</h2>
          <p>We will turn JSONPlaceholder data into a realistic, tested application.</p>
        </div>
        <span className="status">Foundation ready</span>
      </div>

      <div className="dashboard__grid">
        <article className="feature-card">
          <span className="feature-card__number">01</span>
          <h3>Posts</h3>
          <p>Fetching, caching, filtering, pagination, and mutations.</p>
        </article>
        <article className="feature-card">
          <span className="feature-card__number">02</span>
          <h3>Users</h3>
          <p>Typed models, nested routes, reusable components, and forms.</p>
        </article>
        <article className="feature-card">
          <span className="feature-card__number">03</span>
          <h3>Quality</h3>
          <p>Error handling, accessibility, performance, and Cypress tests.</p>
        </article>
      </div>
    </section>
  )
}

function App() {
  const [activeItem, setActiveItem] = useState<NavigationItem['id']>('dashboard')
  const selectedItem = navigationItems.find((item) => item.id === activeItem)

  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="#main-content" aria-label="ProjectHub home">
          <span className="brand__mark">PH</span>
          <span>ProjectHub</span>
        </a>
        <span className="environment-badge">Development</span>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <p className="sidebar__label">Workspace</p>
          <Navigation activeItem={activeItem} onItemChange={setActiveItem} />
        </aside>

        <main id="main-content" className="main-content">
          {activeItem === 'dashboard' ? (
            <Dashboard />
          ) : (
            <section className="placeholder" aria-live="polite">
              <p className="eyebrow">Coming in a later step</p>
              <h2>{selectedItem?.label}</h2>
              <p>
                This section is intentionally empty. We will build it while learning
                the related React topics.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
