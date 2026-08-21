import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { AccessibleModal } from '../components/AccessibleModal'
import { useAuth } from '../features/auth/hooks/useAuth'
import { PostComments } from '../features/comments/components/PostComments'
import { useDeletePost } from '../features/posts/mutations/useDeletePost'
import { usePost } from '../features/posts/queries/usePosts'
import { getErrorMessage } from '../lib/getErrorMessage'

//z.coerce.number() converts "42" into 42.
const postIdSchema = z.coerce.number().int().positive()

function PostDetail({ postId }: { postId: number }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const { user } = useAuth()
  const canManagePosts = user?.role === 'admin'
  const navigate = useNavigate()
  const deletePostMutation = useDeletePost()
  const { data: post, error, isError, isFetching, isPending, refetch } =
    usePost(postId)

  const closeDeleteModal = useCallback(() => {
    if (!deletePostMutation.isPending) setIsConfirmingDelete(false)
  }, [deletePostMutation.isPending])

  async function confirmDelete() {
    try {
      await deletePostMutation.mutateAsync(postId)
      navigate('/posts')
    } catch {
      // The mutation exposes the error through its error state.
    }
  }

  let postContent

  if (isPending) {
    postContent = (
      <div className="state-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <h1 id="post-detail-heading">Loading post…</h1>
      </div>
    )
  } else if (isError) {
    postContent = (
      <div className="state-panel state-panel--error" role="alert">
        <h1 id="post-detail-heading">We couldn’t load this post</h1>
        <p>{getErrorMessage(error, 'post')}</p>
        <button type="button" onClick={() => void refetch()}>Try again</button>
      </div>
    )
  } else {
    postContent = (
      <article className="post-detail">
        <div className="post-detail__meta">
          <span>Post #{post.id}</span>
          <span>User {post.userId}</span>
          {isFetching && <span role="status">Refreshing…</span>}
        </div>
        <h1 id="post-detail-heading">{post.title}</h1>
        <p>{post.body}</p>
        {canManagePosts && (
          <>
            <div className="post-detail__actions">
              <Link className="secondary-link" to={`/posts/${postId}/edit`}>
                Edit post
              </Link>
              <button className="danger-button" type="button" onClick={() => setIsConfirmingDelete(true)}>
                Delete post
              </button>
            </div>

            <AccessibleModal
              isOpen={isConfirmingDelete}
              title="Delete this post?"
              isDismissible={!deletePostMutation.isPending}
              onClose={closeDeleteModal}
            >
              <p>This action cannot be undone. The post will be removed from the local cache.</p>
              {deletePostMutation.isError && (
                <p className="delete-error" role="alert">
                  {getErrorMessage(deletePostMutation.error, 'delete post')}
                </p>
              )}
              <div className="modal-actions">
                <button
                  className="danger-button"
                  data-autofocus
                  disabled={deletePostMutation.isPending}
                  type="button"
                  onClick={() => void confirmDelete()}
                >
                  {deletePostMutation.isPending ? 'Deleting…' : 'Confirm delete'}
                </button>
                <button
                  className="secondary-button"
                  disabled={deletePostMutation.isPending}
                  type="button"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </AccessibleModal>
          </>
        )}
      </article>
    )
  }

  return (
    <>
      {postContent}
      <PostComments postId={postId} />
    </>
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
