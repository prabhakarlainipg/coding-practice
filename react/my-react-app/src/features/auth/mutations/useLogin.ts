import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'

export function useLogin() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: authenticateUser,
    onSuccess: login,
  })
}
