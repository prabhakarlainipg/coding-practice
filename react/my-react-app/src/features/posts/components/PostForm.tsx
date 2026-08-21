import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createPostSchema, type CreatePostInput } from '../types/post'

type PostFormProps = {
  defaultValues: CreatePostInput
  headingId: string
  heading: string
  description: string
  submitLabel: string
  pendingLabel: string
  isMutationPending: boolean
  isMutationSuccess: boolean
  onSubmit: (data: CreatePostInput) => Promise<void>
  onReset: () => void
}

export function PostForm({
  defaultValues,
  headingId,
  heading,
  description,
  submitLabel,
  pendingLabel,
  isMutationPending,
  isMutationSuccess,
  onSubmit,
  onReset,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, touchedFields },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
    mode: 'onBlur',
  })

  function resetForm() {
    reset(defaultValues)
    onReset()
  }

  const isPending = isSubmitting || isMutationPending

  return (
    <div className="form-card">
      <div className="form-card__heading">
        <div>
          <p className="eyebrow">React Hook Form + Zod</p>
          <h1 id={headingId}>{heading}</h1>
          <p>{description}</p>
        </div>
        <span className={isDirty ? 'form-status form-status--dirty' : 'form-status'}>
          {isDirty ? 'Unsaved changes' : 'No changes'}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-field">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="number"
            min="1"
            max="10"
            aria-invalid={Boolean(errors.userId)}
            aria-describedby={errors.userId ? 'userId-error' : 'userId-help'}
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
            {...register('title')}
          />
          {errors.title && (
            <p className="field-error" id="title-error" role="alert">{errors.title.message}</p>
          )}
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
          {errors.body && (
            <p className="field-error" id="body-error" role="alert">{errors.body.message}</p>
          )}
        </div>

        <div className="form-summary" aria-live="polite">
          {Object.keys(touchedFields).length} fields visited
          {isMutationSuccess && ' · Saved successfully'}
        </div>
        <div className="form-actions">
          <button className="primary-button" disabled={isPending} type="submit">
            {isPending ? pendingLabel : submitLabel}
          </button>
          <button
            className="secondary-button"
            disabled={!isDirty && !isMutationSuccess}
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
