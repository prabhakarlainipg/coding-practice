import { useQuery } from '@tanstack/react-query'
import { getTodos, getTodosByUserId } from '../api/todosApi'

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: () => [...todoKeys.lists(), 'all'] as const,
  byUser: (userId: number) => [...todoKeys.lists(), 'user', userId] as const,
}

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.list(),
    queryFn: ({ signal }) => getTodos(signal),
  })
}

export function useUserTodos(userId: number) {
  return useQuery({
    queryKey: todoKeys.byUser(userId),
    queryFn: ({ signal }) => getTodosByUserId(userId, signal),
  })
}
