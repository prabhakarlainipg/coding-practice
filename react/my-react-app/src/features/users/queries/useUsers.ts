import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../api/usersApi'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: ({ signal }) => getUsers(signal),
  })
}
