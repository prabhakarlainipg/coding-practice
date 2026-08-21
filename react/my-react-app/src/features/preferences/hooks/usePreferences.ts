import { useContext } from 'react'
import {
  PreferencesActionsContext,
  PreferencesStateContext,
} from '../context/PreferencesContext'

export function usePreferencesState() {
  const context = useContext(PreferencesStateContext)

  if (!context) {
    throw new Error('usePreferencesState must be used within PreferencesProvider')
  }

  return context
}

export function usePreferencesActions() {
  const context = useContext(PreferencesActionsContext)

  if (!context) {
    throw new Error('usePreferencesActions must be used within PreferencesProvider')
  }

  return context
}
