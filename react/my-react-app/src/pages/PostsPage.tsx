import { ZodError } from 'zod'
import { PostCard } from '../features/posts/components/PostCard'
import { usePosts } from '../features/posts/queries/usePosts'
import { HttpError } from '../lib/httpClient'

function getErrorMessage(error: unknown): string {
  if (error instanceof HttpError) {
    return `The posts request failed (${error.status}).`
  }
  if (error instanceof ZodError) {
    return 'The API returned data in an unexpected format.'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred.'
}

export function PostsPage() {
  const { data: posts = [], error, isError, isFetching, isPending, refetch } =
    usePosts()

  return (
    <section aria-labelledby="posts-heading" className="posts-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">JSONPlaceholder API</p>
          <h1 id="posts-heading">Posts</h1>
          <p>Remote data cached and synchronized by TanStack Query.</p>
        </div>

        {!isPending && !isError && (
          <div className="page-actions">
            <span className="result-count">{posts.length} posts</span>
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
          <p>Loading posts…</p>
        </div>
      )}

      {isError && (
        <div className="state-panel state-panel--error" role="alert">
          <h2>We couldn’t load the posts</h2>
          <p>{getErrorMessage(error)}</p>
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && posts.length === 0 && (
        <div className="state-panel">
          <h2>No posts found</h2>
          <p>The request succeeded, but the API returned an empty list.</p>
        </div>
      )}

      {!isPending && !isError && posts.length > 0 && (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
