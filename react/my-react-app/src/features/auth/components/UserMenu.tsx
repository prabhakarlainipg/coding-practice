import { useAuth } from '../hooks/useAuth'
import { useToast } from '../../notifications/hooks/useToast'

export function UserMenu() {
  const { logout, user } = useAuth()
  const { showToast } = useToast()

  if (!user) {
    return null
  }

  function handleLogout() {
    logout()
    showToast({
      title: 'Signed out',
      message: 'Your local session has been cleared.',
      variant: 'info',
    })
  }

  return (
    <div className="user-menu" data-cy="user-menu">
      <span title={user.email}>{user.name} · {user.role}</span>
      <button data-cy="logout" type="button" onClick={handleLogout}>Log out</button>
    </div>
  )
}
