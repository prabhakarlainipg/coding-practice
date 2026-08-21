import { authSessionSchema, type AuthSession } from '../types/auth'

const AUTH_SESSION_STORAGE_KEY = 'projecthub.auth-session'

export function readAuthSession(): AuthSession | null {
  try {
    const storedSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY)

    if (!storedSession) {
      return null
    }

    const result = authSessionSchema.safeParse(JSON.parse(storedSession))

    if (!result.success) {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
      return null
    }

    return result.data
  } catch {
    return null
  }
}

export function writeAuthSession(session: AuthSession): void {
  try {
    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // The in-memory session can still work when browser storage is unavailable.
  }
}

export function removeAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  } catch {
    // React state is still cleared by AuthProvider.
  }
}
