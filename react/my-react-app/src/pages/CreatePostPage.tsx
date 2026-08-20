import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { createPostSchema, type CreatePostInput } from '../features/posts/types/post'

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
  const [preview, setPreview] = useState<CreatePostInput | null>(null)
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
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, touchedFields },
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
    setPreview(null)
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

        <form onSubmit={handleSubmit(setPreview)} noValidate>
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
            {isSubmitSuccessful && ' · Validation passed'}
          </div>
          <div className="form-actions">
            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Validating…' : 'Validate post'}
            </button>
            <button className="secondary-button" disabled={!isDirty} type="button" onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>

      {preview && (
        <article className="post-preview" aria-labelledby="preview-heading">
          <p className="eyebrow">Validated preview</p>
          <h2 id="preview-heading">{preview.title}</h2>
          <p>{preview.body}</p>
          <span>User {preview.userId}</span>
        </article>
      )}
    </section>
  )
}
