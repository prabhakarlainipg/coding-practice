import { createContext } from 'react'
import type { AuthState, AuthUser } from '../types/auth'

export type AuthContextValue = AuthState & {
  login: (user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
