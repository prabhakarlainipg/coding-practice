import { useOnlineStatus } from '../hooks/useOnlineStatus'

export function NetworkStatus() {
  const isOnline = useOnlineStatus()

  return (
    <>
      <span
        className={isOnline ? 'network-status' : 'network-status network-status--offline'}
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true" />
        {isOnline ? 'Online' : 'Offline'}
      </span>

      {!isOnline && (
        <div className="offline-banner" role="alert">
          You’re offline. Cached pages remain available; network actions will resume after reconnection.
        </div>
      )}
    </>
  )
}
