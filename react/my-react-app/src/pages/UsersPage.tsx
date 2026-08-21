import { UserCard } from '../features/users/components/UserCard'
import { useUsers } from '../features/users/queries/useUsers'
import { getErrorMessage } from '../lib/getErrorMessage'

export function UsersPage() {
  const { data: users = [], error, isError, isFetching, isPending, refetch } =
    useUsers()

  return (
    <section className="users-page" aria-labelledby="users-heading">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Team directory</p>
          <h1 id="users-heading">Users</h1>
          <p>Nested user, company, address, and location data validated with Zod.</p>
        </div>
        {!isPending && !isError && (
          <div className="page-actions">
            <span className="result-count">{users.length} users</span>
            <button
              className="secondary-button"
              disabled={isFetching}
              type="button"
              onClick={() => void refetch()}
            >
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        )}
      </div>

      {isPending && (
        <div className="state-panel" role="status">
          <span className="spinner" aria-hidden="true" />
          <p>Loading users…</p>
        </div>
      )}

      {isError && (
        <div className="state-panel state-panel--error" role="alert">
          <h2>We couldn’t load the users</h2>
          <p>{getErrorMessage(error, 'users')}</p>
          <button type="button" onClick={() => void refetch()}>Try again</button>
        </div>
      )}

      {!isPending && !isError && users.length === 0 && (
        <div className="state-panel">
          <h2>No users found</h2>
          <p>The request succeeded, but the API returned an empty list.</p>
        </div>
      )}

      {!isPending && !isError && users.length > 0 && (
        <div className="users-grid">
          {users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      )}
    </section>
  )
}
