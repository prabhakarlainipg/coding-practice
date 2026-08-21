import { request } from '../../../lib/httpClient'
import { userSchema, usersSchema } from '../types/user'
import type { User } from '../types/user'

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const data = await request<unknown>('/users', { signal })
  return usersSchema.parse(data)
}

export async function getUserById(
  userId: number,
  signal?: AbortSignal,
): Promise<User> {
  const data = await request<unknown>(`/users/${userId}`, { signal })
  return userSchema.parse(data)
}
