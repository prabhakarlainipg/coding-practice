import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import { useUser } from '../features/users/queries/useUsers'
import { getErrorMessage } from '../lib/getErrorMessage'

const userIdSchema = z.coerce.number().int().positive()

function UserProfile({ userId }: { userId: number }) {
  const { data: user, error, isError, isFetching, isPending, refetch } =
    useUser(userId)

  if (isPending) {
    return (
      <div className="state-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading user profile…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <h1 id="user-detail-heading">We couldn’t load this user</h1>
        <p>{getErrorMessage(error, 'user')}</p>
        <button type="button" onClick={() => void refetch()}>Try again</button>
      </div>
    )
  }

  return (
    <article className="user-profile">
      <header className="user-profile__header">
        <div className="user-profile__avatar" aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="eyebrow">@{user.username}</p>
          <h1 id="user-detail-heading">{user.name}</h1>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
        {isFetching && <span className="result-count" role="status">Refreshing…</span>}
      </header>

      <div className="profile-grid">
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <dl>
            <div><dt>Phone</dt><dd>{user.phone}</dd></div>
            <div>
              <dt>Website</dt>
              <dd><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="address-heading">
          <h2 id="address-heading">Address</h2>
          <address>
            {user.address.suite}, {user.address.street}<br />
            {user.address.city} {user.address.zipcode}
          </address>
          <p className="coordinates">{user.address.geo.lat}, {user.address.geo.lng}</p>
        </section>

        <section aria-labelledby="company-heading">
          <h2 id="company-heading">Company</h2>
          <strong>{user.company.name}</strong>
          <p>{user.company.catchPhrase}</p>
          <small>{user.company.bs}</small>
        </section>
      </div>
    </article>
  )
}

export function UserDetailPage() {
  const { userId } = useParams()
  const parsedUserId = userIdSchema.safeParse(userId)

  return (
    <section className="user-detail-page" aria-labelledby="user-detail-heading">
      <Link className="back-link" to="/users">← Back to users</Link>
      {parsedUserId.success ? (
        <UserProfile userId={parsedUserId.data} />
      ) : (
        <div className="state-panel state-panel--error" role="alert">
          <h1 id="user-detail-heading">Invalid user address</h1>
          <p>The user ID must be a positive whole number.</p>
        </div>
      )}
    </section>
  )
}
