import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import { PostForm } from '../features/posts/components/PostForm'
import { useUpdatePost } from '../features/posts/mutations/useUpdatePost'
import { usePost } from '../features/posts/queries/usePosts'
import type { CreatePostInput, Post } from '../features/posts/types/post'
import { getErrorMessage } from '../lib/getErrorMessage'

const postIdSchema = z.coerce.number().int().positive()

function toFormValues(post: Post): CreatePostInput {
  return {
    userId: post.userId,
    title: post.title,
    body: post.body,
  }
}

function EditPostForm({ postId }: { postId: number }) {
  const postQuery = usePost(postId)
  const updatePostMutation = useUpdatePost(postId)

  async function submitForm(data: CreatePostInput) {
    try {
      await updatePostMutation.mutateAsync(data)
    } catch {
      // Mutation state exposes the error below the form.
    }
  }

  if (postQuery.isPending) {
    return (
      <div className="state-panel" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading post for editing…</p>
      </div>
    )
  }

  if (postQuery.isError) {
    return (
      <div className="state-panel state-panel--error" role="alert">
        <h1 id="edit-post-heading">We couldn’t load this post</h1>
        <p>{getErrorMessage(postQuery.error, 'post')}</p>
        <button type="button" onClick={() => void postQuery.refetch()}>Try again</button>
      </div>
    )
  }

  return (
    <>
      <PostForm
        defaultValues={toFormValues(postQuery.data)}
        headingId="edit-post-heading"
        heading="Edit post"
        description={`Update post #${postQuery.data.id} and save the validated changes.`}
        submitLabel="Save changes"
        pendingLabel="Saving…"
        isMutationPending={updatePostMutation.isPending}
        isMutationSuccess={updatePostMutation.isSuccess}
        onSubmit={submitForm}
        onReset={updatePostMutation.reset}
      />

      {updatePostMutation.isError && (
        <div className="mutation-message mutation-message--error" role="alert">
          <h2>Post update failed</h2>
          <p>{getErrorMessage(updatePostMutation.error, 'update post')}</p>
        </div>
      )}

      {updatePostMutation.isSuccess && (
        <div className="mutation-message mutation-message--success" role="status">
          <h2>Changes saved</h2>
          <p>The confirmed response has been written to the post caches.</p>
          <Link className="text-link" to={`/posts/${postId}`}>View updated post</Link>
        </div>
      )}
    </>
  )
}

export function EditPostPage() {
  const { postId } = useParams()
  const parsedPostId = postIdSchema.safeParse(postId)

  return (
    <section className="create-post-page" aria-labelledby="edit-post-heading">
      <Link className="back-link" to={`/posts/${postId ?? ''}`}>← Back to post</Link>
      {parsedPostId.success ? (
        <EditPostForm postId={parsedPostId.data} />
      ) : (
        <div className="state-panel state-panel--error" role="alert">
          <h1 id="edit-post-heading">Invalid post address</h1>
          <p>The post ID must be a positive whole number.</p>
        </div>
      )}
    </section>
  )
}
