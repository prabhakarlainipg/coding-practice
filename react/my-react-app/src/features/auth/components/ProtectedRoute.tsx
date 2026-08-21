import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'unauthenticated') {
    const requestedUrl = `${location.pathname}${location.search}${location.hash}`

    return <Navigate to="/login" replace state={{ from: requestedUrl }} />
  }

  return <Outlet />
}
