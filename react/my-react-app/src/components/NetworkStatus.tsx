import { useOnlineStatus } from '../hooks/useOnlineStatus'
import {useOnline} from "../hooks/useOnline.tsx";

export function NetworkStatus() {
  const isOnline = useOnlineStatus();
  const isConnected = useOnline();

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

        <span
            className={isConnected ? 'network-status' : 'network-status network-status--offline'}
            role="status"
            aria-live="polite"
        >
        <span aria-hidden="true" />
            {isConnected ? 'Online' : 'Offline'}
      </span>

        {!isConnected && (
            <div className="offline-banner" role="alert">
                You’re offline. Cached pages remain available; network actions will resume after reconnection.
            </div>
        )}
    </>
  )
}
