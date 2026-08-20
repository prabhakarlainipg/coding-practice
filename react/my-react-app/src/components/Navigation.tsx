import { NavLink } from 'react-router-dom'

type NavigationItem = { path: string; label: string; description: string }

const navigationItems: NavigationItem[] = [
  { path: '/', label: 'Dashboard', description: 'Application overview' },
  { path: '/posts', label: 'Posts', description: 'Read and manage posts' },
  { path: '/users', label: 'Users', description: 'Browse user profiles' },
  { path: '/todos', label: 'Todos', description: 'Track user tasks' },
]

export function Navigation() {
  return (
    <nav aria-label="Primary navigation" className="navigation">
      <ul className="navigation__list">
        {navigationItems.map((item) => (
          <li key={item.path}>
{/*
              navigates without reloading the browser
*/}
            <NavLink
              className={({ isActive }) =>
                `navigation__link${isActive ? ' navigation__link--active' : ''}`
              }
              end={item.path === '/'}
              to={item.path}
            >
              <span>{item.label}</span>
              <small>{item.description}</small>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
