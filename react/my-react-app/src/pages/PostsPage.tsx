import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PostCard } from '../features/posts/components/PostCard'
import { usePosts } from '../features/posts/queries/usePosts'
import { getErrorMessage } from '../lib/getErrorMessage'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const PAGE_SIZE = 10
const sortOptions = ['newest', 'oldest', 'title'] as const
type SortOption = (typeof sortOptions)[number]

function isSortOption(value: string | null): value is SortOption {
  return sortOptions.some((option) => option === value)
}

function getPageNumber(value: string | null): number {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function PostsPage() {
  useDocumentTitle('Posts | ProjectHub')
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
  const debouncedSearchTerm = useDebouncedValue(searchTerm)
  const sortParam = searchParams.get('sort')
  const sort: SortOption = isSortOption(sortParam) ? sortParam : 'newest'
  const requestedPage = getPageNumber(searchParams.get('page'))

  const sortedPosts = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLocaleLowerCase()
    const matchingPosts = normalizedSearch
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLocaleLowerCase()
            .includes(normalizedSearch),
        )
      : posts

    return [...matchingPosts].sort((firstPost, secondPost) => {
      if (sort === 'title') return firstPost.title.localeCompare(secondPost.title)
      if (sort === 'oldest') return firstPost.id - secondPost.id
      return secondPost.id - firstPost.id
    })
  }, [posts, debouncedSearchTerm, sort])

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE))
  const currentPage = Math.min(requestedPage, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const visiblePosts = sortedPosts.slice(pageStart, pageStart + PAGE_SIZE)

  function updateSearch(value: string) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value) {
      nextSearchParams.set('q', value)
    } else {
      nextSearchParams.delete('q')
    }
    nextSearchParams.delete('page')

    setSearchParams(nextSearchParams, { replace: true })
  }

  function updateSort(value: SortOption) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (value === 'newest') nextSearchParams.delete('sort')
    else nextSearchParams.set('sort', value)
    nextSearchParams.delete('page')

    setSearchParams(nextSearchParams)
  }

  function updatePage(page: number) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (page === 1) nextSearchParams.delete('page')
    else nextSearchParams.set('page', String(page))

    setSearchParams(nextSearchParams)
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
              {sortedPosts.length} of {posts.length} posts
            </span>
            <button
              className="secondary-button"
              disabled={isFetching}
              type="button"
              onClick={() => void refetch()}
            >
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
            <Link className="primary-link" to="/posts/new">Create post</Link>
          </div>
        )}
      </div>

      {!isPending && !isError && (
        <div className="filter-bar">
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
            {searchTerm !== debouncedSearchTerm && (
              <p className="search-pending" role="status">Updating results…</p>
            )}
          </div>
          <div className="sort-control">
            <label htmlFor="post-sort">Sort posts</label>
            <select
              id="post-sort"
              value={sort}
              onChange={(event) => updateSort(event.target.value as SortOption)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
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
          <p>{getErrorMessage(error, 'posts')}</p>
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

      {!isPending && !isError && posts.length > 0 && sortedPosts.length === 0 && (
        <div className="state-panel">
          <h2>No matching posts</h2>
          <p>Try a different search term or clear the current search.</p>
          <button type="button" onClick={() => updateSearch('')}>
            Clear search
          </button>
        </div>
      )}

      {!isPending && !isError && sortedPosts.length > 0 && (
        <>
          <div className="posts-grid">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <nav className="pagination" aria-label="Posts pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => updatePage(currentPage - 1)}
            >
              Previous
            </button>
            <span aria-live="polite">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => updatePage(currentPage + 1)}
            >
              Next
            </button>
          </nav>
        </>
      )}
    </section>
  )
}
