import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  /*Benefits:
      Search survives page refresh
  URLs can be bookmarked
  Search URLs can be shared
  Browser navigation understands the state
  Cypress can directly open a filtered view*/
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: posts = [], error, isError, isFetching, isPending, refetch } =
    usePosts()
  const searchTerm = searchParams.get('q') ?? ''

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()

    if (!normalizedSearch) return posts

    return posts.filter((post) =>
      `${post.title} ${post.body}`.toLocaleLowerCase().includes(normalizedSearch),
    )
  }, [posts, searchTerm])

  function updateSearch(value: string) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value) {
      nextSearchParams.set('q', value)
    } else {
      nextSearchParams.delete('q')
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

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
            <span className="result-count">
              {filteredPosts.length} of {posts.length} posts
            </span>
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

      {!isPending && !isError && (
        <div className="search-bar" role="search">
          <label htmlFor="post-search">Search posts</label>
          <div className="search-bar__control">
            <input
              id="post-search"
              type="search"
              value={searchTerm}
              placeholder="Search by title or content"
              onChange={(event) => updateSearch(event.target.value)}
            />
            {searchTerm && (
              <button type="button" onClick={() => updateSearch('')}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}

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

      {!isPending && !isError && posts.length > 0 && filteredPosts.length === 0 && (
        <div className="state-panel">
          <h2>No matching posts</h2>
          <p>Try a different search term or clear the current search.</p>
          <button type="button" onClick={() => updateSearch('')}>
            Clear search
          </button>
        </div>
      )}

      {!isPending && !isError && filteredPosts.length > 0 && (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
