import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useCreatePost } from '../features/posts/mutations/useCreatePost'
import { createPostSchema, type CreatePostInput } from '../features/posts/types/post'
import { getErrorMessage } from '../lib/getErrorMessage'

const defaultValues: CreatePostInput = { userId: 1, title: '', body: '' }
/*
Submit
   ↓
React Hook Form gathers values
   ↓
Zod validates them
   ↓
Invalid → display field errors
Valid   → setPreview(validatedData)
*/
export function CreatePostPage() {
  const createPostMutation = useCreatePost()
 /* Performance is an important aspect of user experience in terms of building forms.
      You have the ability to subscribe to individual input and form state updates without re-rendering the entire form.
       It has a lot of useful tools and doesn’t require much code compared to Formik, and Redux Form.
       As the number of re-renders in the application is small and mounting time is less it is super smooth.
       */
  const {

    register,
/*
    handleSubmit validates before calling the submit function.
*/
    handleSubmit,
/*
    reset restores default values.
*/
    reset,
/*
    formState describes errors and user interaction.
    isDirty — at least one value differs from its default
*/
    formState: { errors, isDirty, isSubmitting, touchedFields },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
/*
    validates a field when the user leaves it.
*/
    mode: 'onBlur',
  })

  function resetForm() {
    reset(defaultValues)
    createPostMutation.reset()
  }

  async function submitForm(data: CreatePostInput) {
    try {
      //mutateAsync is TanStack Query’s Promise-based function
      // for executing a mutation.
      //mutate starts the mutation but does not return a Promise containing the mutation result.
      // Callbacks are commonly used:
      //createPostMutation.mutate(data, {
      //   onSuccess: (createdPost) => {
      //     console.log(createdPost)
      //   },
      //   onError: (error) => {
      //     console.error(error)
      //   },
      // })
      await createPostMutation.mutateAsync(data)
    } catch {
      // The mutation stores the error and the page renders it below the form.
    }
  }

  return (
    <section className="create-post-page" aria-labelledby="create-post-heading">
      <Link className="back-link" to="/posts">← Back to posts</Link>
      <div className="form-card">
        <div className="form-card__heading">
          <div>
            <p className="eyebrow">React Hook Form + Zod</p>
            <h1 id="create-post-heading">Create a post</h1>
            <p>Complete the fields to produce validated post data.</p>
          </div>
          <span className={isDirty ? 'form-status form-status--dirty' : 'form-status'}>
            {isDirty ? 'Unsaved changes' : 'No changes'}
          </span>
        </div>

        <form onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="form-field">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="number"
              min="1"
              max="10"
              aria-invalid={Boolean(errors.userId)}
              aria-describedby={errors.userId ? 'userId-error' : 'userId-help'}
/* These are uncontrolled inputs
              React Hook Form primarily tracks these through DOM references. We do not call setState on every keystroke.
              Uncontrolled fields usually require fewer React rerenders.
*/
              {...register('userId', { valueAsNumber: true })}
            />
            {errors.userId ? (
              <p className="field-error" id="userId-error" role="alert">{errors.userId.message}</p>
            ) : (
              <p className="field-help" id="userId-help">Choose a user from 1 to 10.</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
/*
               register connects HTML fields to the form.
*/
              {...register('title')}
            />
            {errors.title && <p className="field-error" id="title-error" role="alert">{errors.title.message}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              rows={7}
              aria-invalid={Boolean(errors.body)}
              aria-describedby={errors.body ? 'body-error' : undefined}
              {...register('body')}
            />
            {errors.body && <p className="field-error" id="body-error" role="alert">{errors.body.message}</p>}
          </div>

          <div className="form-summary" aria-live="polite">
            {Object.keys(touchedFields).length} fields visited
            {createPostMutation.isSuccess && ' · Post created'}
          </div>
          <div className="form-actions">
            <button className="primary-button" disabled={isSubmitting || createPostMutation.isPending} type="submit">
              {isSubmitting || createPostMutation.isPending ? 'Creating…' : 'Create post'}
            </button>
            <button className="secondary-button" disabled={!isDirty && createPostMutation.isIdle} type="button" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>

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
          <span>User {createPostMutation.data.userId} · Post #{createPostMutation.data.id}</span>
          <Link className="text-link" to={`/posts/${createPostMutation.data.id}`}>View created post</Link>
        </article>
      )}
    </section>
  )
}
