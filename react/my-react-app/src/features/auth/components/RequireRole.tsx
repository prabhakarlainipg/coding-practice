import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { AuthUser } from '../types/auth'

type RequireRoleProps = {
  allowedRoles: readonly AuthUser['role'][]
}

export function RequireRole({ allowedRoles }: RequireRoleProps) {
  const { status, user } = useAuth()
  const location = useLocation()

  if (status === 'unauthenticated') {
    const requestedUrl = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to="/login" replace state={{ from: requestedUrl }} />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
