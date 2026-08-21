import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  PreferencesActionsContext,
  PreferencesStateContext,
  type PreferencesActions,
  type Theme,
} from './PreferencesContext'

const THEME_STORAGE_KEY = 'project-hub-theme'

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

type PreferencesProviderProps = {
  children: ReactNode
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
      //document.documentElement refers to the document’s root <html> element.
      //The browser’s dataset API maps JavaScript properties to HTML data-* attributes.
      //document.documentElement.dataset.theme = 'dark' this becomes <html data-theme="dark">
      //then below CSS applies
      //:root[data-theme='dark'] body,
      // :root[data-theme='dark'] .app-shell {
      //   color: #d7dcea;
      //   background: #121620;
      // }
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const state = useMemo(() => ({ theme }), [theme])
  const actions = useMemo<PreferencesActions>(
    () => ({
      setTheme,
      toggleTheme: () => setTheme((currentTheme) =>
        currentTheme === 'light' ? 'dark' : 'light',
      ),
    }),
    [],
  )

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesActionsContext.Provider value={actions}>
        {children}
      </PreferencesActionsContext.Provider>
    </PreferencesStateContext.Provider>
  )
}
