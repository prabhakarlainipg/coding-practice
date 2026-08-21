import { useAuth } from '../hooks/useAuth'

export function UserMenu() {
  const { logout, user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="user-menu">
      <span title={user.email}>{user.name} · {user.role}</span>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  )
}
