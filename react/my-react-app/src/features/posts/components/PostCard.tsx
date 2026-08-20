import type { Post } from '../types/post'

type PostCardProps = { post: Post }

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>Post #{post.id}</span>
        <span>User {post.userId}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  )
}
