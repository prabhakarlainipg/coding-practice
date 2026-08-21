import {
  usePreferencesActions,
  usePreferencesState,
} from '../hooks/usePreferences'

export function ThemeToggle() {
  const { theme } = usePreferencesState()
  const { toggleTheme } = usePreferencesActions()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
