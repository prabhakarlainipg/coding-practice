import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'
import {
  readAuthSession,
  removeAuthSession,
  writeAuthSession,
} from '../storage/authStorage'
import type { AuthState, AuthUser } from '../types/auth'

type AuthProviderProps = {
  children: ReactNode
}

function getInitialAuthState(): AuthState {
  const session = readAuthSession()

  return session
    ? { status: 'authenticated', user: session.user }
    : { status: 'unauthenticated', user: null }
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Passing a function makes this localStorage read happen only on the initial render.
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState)

  const login = useCallback((user: AuthUser) => {
    writeAuthSession({ user })
    setAuthState({ status: 'authenticated', user })
  }, [])

  const logout = useCallback(() => {
    removeAuthSession()
    setAuthState({ status: 'unauthenticated', user: null })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ ...authState, login, logout }),
    [authState, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
