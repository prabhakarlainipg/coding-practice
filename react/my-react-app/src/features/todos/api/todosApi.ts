import { request } from '../../../lib/httpClient'
import { todosSchema } from '../types/todo'
import type { Todo } from '../types/todo'

export async function getTodosByUserId(
  userId: number,
  signal?: AbortSignal,
): Promise<Todo[]> {
  const data = await request<unknown>(`/users/${userId}/todos`, { signal })
  return todosSchema.parse(data)
}
