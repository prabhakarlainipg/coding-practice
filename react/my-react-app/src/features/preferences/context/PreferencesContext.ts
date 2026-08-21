import { createContext } from 'react'
/*Use Context for application-wide client preferences:
Theme
Locale
Current authenticated session
Feature settings*/
export type Theme = 'light' | 'dark'

export type PreferencesState = {
  theme: Theme
}

export type PreferencesActions = {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const PreferencesStateContext = createContext<PreferencesState | null>(null)
export const PreferencesActionsContext = createContext<PreferencesActions | null>(null)
