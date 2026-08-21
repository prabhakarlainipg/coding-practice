import { Link } from 'react-router-dom'
import { PostForm } from '../features/posts/components/PostForm'
import { useCreatePost } from '../features/posts/mutations/useCreatePost'
import type { CreatePostInput } from '../features/posts/types/post'
import { getErrorMessage } from '../lib/getErrorMessage'

const defaultValues: CreatePostInput = { userId: 1, title: '', body: '' }

export function CreatePostPage() {
  const createPostMutation = useCreatePost()

  async function submitForm(data: CreatePostInput) {
    try {
      await createPostMutation.mutateAsync(data)
    } catch {
      // Mutation state exposes the error below the form.
    }
  }

  return (
    <section className="create-post-page" aria-labelledby="create-post-heading">
      <Link className="back-link" to="/posts">← Back to posts</Link>
      <PostForm
        defaultValues={defaultValues}
        headingId="create-post-heading"
        heading="Create a post"
        description="Complete the fields to create a validated post."
        submitLabel="Create post"
        pendingLabel="Creating…"
        isMutationPending={createPostMutation.isPending}
        isMutationSuccess={createPostMutation.isSuccess}
        onSubmit={submitForm}
        onReset={createPostMutation.reset}
      />

      {createPostMutation.isError && (
        <div className="mutation-message mutation-message--error" role="alert">
          <h2>Post creation failed</h2>
          <p>{getErrorMessage(createPostMutation.error, 'create post')}</p>
        </div>
      )}

      {createPostMutation.isSuccess && (
        <article className="post-preview" aria-labelledby="preview-heading">
          <p className="eyebrow">Server confirmed</p>
          <h2 id="preview-heading">{createPostMutation.data.title}</h2>
          <p>{createPostMutation.data.body}</p>
          <span>
            User {createPostMutation.data.userId} · Post #{createPostMutation.data.id}
          </span>
          <Link className="text-link" to={`/posts/${createPostMutation.data.id}`}>
            View created post
          </Link>
        </article>
      )}
    </section>
  )
}
