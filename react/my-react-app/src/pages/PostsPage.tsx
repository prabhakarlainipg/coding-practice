import { useEffect, useState } from 'react'
import { ZodError } from 'zod'
import { getPosts } from '../features/posts/api/postsApi'
import { PostCard } from '../features/posts/components/PostCard'
import type { Post } from '../features/posts/types/post'
import { HttpError } from '../lib/httpClient'

type PostsState =
  | { status: 'loading' }
  | { status: 'success'; posts: Post[] }
  | { status: 'error'; message: string }

function getErrorMessage(error: unknown): string {
/*
  server returned an unsuccessful HTTP status
*/
  if (error instanceof HttpError) {
    return `The posts request failed (${error.status}).`
  }
/*
  request succeeded, but its data structure was invalid
*/
  if (error instanceof ZodError) {
    return 'The API returned data in an unexpected format.'
  }
/*
  network or another JavaScript error
*/
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred.'
}

export function PostsPage() {
  const [state, setState] = useState<PostsState>({ status: 'loading' })
  const [requestKey, setRequestKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      setState({ status: 'loading' })
      try {
        const posts = await getPosts(controller.signal)
        setState({ status: 'success', posts })
      } catch (error: unknown) {
        if (controller.signal.aborted) return
        setState({ status: 'error', message: getErrorMessage(error) })
      }
    }

    void loadPosts()
    return () => controller.abort()
  }, [requestKey])

  return (
    <section aria-labelledby="posts-heading" className="posts-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">JSONPlaceholder API</p>
          <h1 id="posts-heading">Posts</h1>
          <p>Remote data loaded through our typed API service.</p>
        </div>
        {state.status === 'success' && (
          <span className="result-count">{state.posts.length} posts</span>
        )}
      </div>

      {state.status === 'loading' && (
        <div className="state-panel" role="status">
          <span className="spinner" aria-hidden="true" />
          <p>Loading posts…</p>
        </div>
      )}

      {state.status === 'error' && (
        <div className="state-panel state-panel--error" role="alert">
          <h2>We couldn’t load the posts</h2>
          <p>{state.message}</p>
          <button type="button" onClick={() => setRequestKey((key) => key + 1)}>
            Try again
          </button>
        </div>
      )}

      {state.status === 'success' && state.posts.length === 0 && (
        <div className="state-panel">
          <h2>No posts found</h2>
          <p>The request succeeded, but the API returned an empty list.</p>
        </div>
      )}

      {state.status === 'success' && state.posts.length > 0 && (
        <div className="posts-grid">
          {state.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
