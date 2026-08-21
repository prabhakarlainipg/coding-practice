import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../../notifications/hooks/useToast'

export function useLogin() {
  const { login } = useAuth()
  const { showToast } = useToast()

  return useMutation({
    mutationFn: authenticateUser,
    onSuccess: (user) => {
      login(user)
      showToast({
        title: 'Signed in',
        message: `Welcome back, ${user.name}.`,
        variant: 'success',
      })
    },
  })
}
