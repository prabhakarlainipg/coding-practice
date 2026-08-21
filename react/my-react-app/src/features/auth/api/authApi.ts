import { getUsers } from '../../users/api/usersApi'
import type { AuthUser } from '../types/auth'

export async function authenticateUser(email: string): Promise<AuthUser> {
  const users = await getUsers()
  const normalizedEmail = email.trim().toLocaleLowerCase()
  const user = users.find(
    (candidate) => candidate.email.toLocaleLowerCase() === normalizedEmail,
  )

  if (!user) {
    throw new Error('No account was found for that email address.')
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.id === 1 ? 'admin' : 'member',
  }
}
