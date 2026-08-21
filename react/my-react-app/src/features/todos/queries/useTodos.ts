import { useQuery } from '@tanstack/react-query'
import { getTodosByUserId } from '../api/todosApi'

export const todoKeys = {
  all: ['todos'] as const,
  byUser: (userId: number) => [...todoKeys.all, 'user', userId] as const,
}

export function useUserTodos(userId: number) {
  return useQuery({
    queryKey: todoKeys.byUser(userId),
    queryFn: ({ signal }) => getTodosByUserId(userId, signal),
  })
}
