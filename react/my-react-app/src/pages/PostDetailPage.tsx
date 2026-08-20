import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import { usePost } from '../features/posts/queries/usePosts'
import { getErrorMessage } from '../lib/getErrorMessage'

//z.coerce.number() converts "42" into 42.
const postIdSchema = z.coerce.number().int().positive()

function PostDetail({ postId }: { postId: number }) {
  const { data: post, error, isError, isFetching, isPending, refetch } =
    usePost(postId)

  if (isPending) {
    return (
      <div className="state-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading post…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <h1 id="post-detail-heading">We couldn’t load this post</h1>
        <p>{getErrorMessage(error, 'post')}</p>
        <button type="button" onClick={() => void refetch()}>Try again</button>
      </div>
    )
  }

  return (
    <article className="post-detail">
      <div className="post-detail__meta">
        <span>Post #{post.id}</span>
        <span>User {post.userId}</span>
        {isFetching && <span role="status">Refreshing…</span>}
      </div>
      <h1 id="post-detail-heading">{post.title}</h1>
      <p>{post.body}</p>
    </article>
  )
}

export function PostDetailPage() {
/*
    Reading route parameters
*/
  const { postId } = useParams()
/*
    validating route parameters
*/
  const parsedPostId = postIdSchema.safeParse(postId)

  return (
    <section className="post-detail-page" aria-labelledby="post-detail-heading">
      <Link className="back-link" to="/posts">← Back to posts</Link>
      {parsedPostId.success ? (
        <PostDetail postId={parsedPostId.data} />
      ) : (
        <div className="state-panel state-panel--error" role="alert">
          <h1 id="post-detail-heading">Invalid post address</h1>
          <p>The post ID must be a positive whole number.</p>
        </div>
      )}
    </section>
  )
}
