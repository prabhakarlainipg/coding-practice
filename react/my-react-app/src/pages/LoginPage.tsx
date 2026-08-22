import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useLogin } from '../features/auth/mutations/useLogin'
import { getErrorMessage } from '../lib/getErrorMessage'

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginLocationState = {
  from?: unknown
}

function getSafeRedirect(state: LoginLocationState | null): string {
  const from = state?.from

  return typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
    ? from
    : '/'
}

export function LoginPage() {
  const { status } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { error, isPending, mutateAsync: loginAsync } = useLogin()
  const redirectTo = getSafeRedirect(location.state as LoginLocationState | null)
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  })

  if (status === 'authenticated') {
    return <Navigate to={redirectTo} replace />
  }

  const submitLogin = handleSubmit(async ({ email }) => {
    try {
      await loginAsync(email)
      navigate(redirectTo, { replace: true })
    } catch {
      // TanStack Query exposes this failure through `error` for the form alert.
    }
  })

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-brand" aria-hidden="true">PH</div>
        <p className="eyebrow">ProjectHub access</p>
        <h1 id="login-heading">Welcome back</h1>
        <p>Use a JSONPlaceholder user email to enter the workspace.</p>

        <form onSubmit={(event) => void submitLogin(event)} noValidate>
          <div className="form-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              data-cy="login-email"
              type="email"
              autoComplete="email"
              aria-describedby={errors.email ? 'login-email-error' : 'login-email-help'}
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email ? (
              <p id="login-email-error" className="field-error" data-cy="login-email-error" role="alert">
                {errors.email.message}
              </p>
            ) : (
              <small id="login-email-help">
                Admin: Sincere@april.biz<br />Member: Shanna@melissa.tv
              </small>
            )}
          </div>

          {error && <p className="login-error" role="alert">{getErrorMessage(error, 'login')}</p>}

          <button className="primary-button" data-cy="login-submit" disabled={isPending} type="submit">
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}
