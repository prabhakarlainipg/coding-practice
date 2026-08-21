import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserById, getUsers } from '../api/usersApi'
import type { User } from '../types/user'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (userId: number) => [...userKeys.details(), userId] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: ({ signal }) => getUsers(signal),
  })
}

export function useUser(userId: number) {
  const queryClient = useQueryClient()
  const placeholderUser = queryClient
    .getQueryData<User[]>(userKeys.lists())
    ?.find((user) => user.id === userId)

  return useQuery<User>({
    queryKey: userKeys.detail(userId),
    queryFn: ({ signal }) => getUserById(userId, signal),
    placeholderData: placeholderUser,
  })
}
