import { Link } from 'react-router-dom'
import type { Post } from '../types/post'

type PostCardProps = { post: Post }

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card" data-cy="post-card">
      <div className="post-card__meta">
        <span>Post #{post.id}</span>
        <span>User {post.userId}</span>
      </div>
      <h2>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.body}</p>
      <Link className="post-card__link" to={`/posts/${post.id}`}>
        Read post
      </Link>
    </article>
  )
}
