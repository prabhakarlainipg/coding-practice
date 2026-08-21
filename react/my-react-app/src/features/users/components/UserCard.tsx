import { Link } from 'react-router-dom'
import type { User } from '../types/user'

type UserCardProps = {
  user: User
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="user-card">
      <header className="user-card__header">
        <div className="user-card__avatar" aria-hidden="true">{getInitials(user.name)}</div>
        <div>
          <h2><Link to={`/users/${user.id}`}>{user.name}</Link></h2>
          <p>@{user.username}</p>
        </div>
      </header>

      <dl className="user-card__details">
        <div>
          <dt>Company</dt>
          <dd>{user.company.name}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{user.address.city}, {user.address.zipcode}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
      </dl>

      <div className="user-card__links">
        <Link to={`/users/${user.id}`}>View profile</Link>
        <a href={`mailto:${user.email}`}>Email</a>
        <a href={`https://${user.website}`} target="_blank" rel="noreferrer">Website</a>
      </div>
    </article>
  )
}
