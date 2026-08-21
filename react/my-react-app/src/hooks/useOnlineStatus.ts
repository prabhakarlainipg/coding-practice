import { useSyncExternalStore } from 'react'
//useSyncExternalStore is designed for values managed outside React.

//listen for future client changes
function subscribe(onStoreChange: () => void) {
  window.addEventListener('online', onStoreChange)
  window.addEventListener('offline', onStoreChange)

  return () => {
    window.removeEventListener('online', onStoreChange)
    window.removeEventListener('offline', onStoreChange)
  }
}
// read the current browser value
function getSnapshot() {
  return navigator.onLine
}
// read the server/initial hydration value
function getServerSnapshot() {
  return true
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
