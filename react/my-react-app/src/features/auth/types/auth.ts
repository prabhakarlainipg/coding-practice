import { z } from 'zod'

export const authUserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.email(),
  role: z.enum(['admin', 'member']),
})

export const authSessionSchema = z.object({
  user: authUserSchema,
})

export type AuthUser = z.infer<typeof authUserSchema>
export type AuthSession = z.infer<typeof authSessionSchema>

export type AuthState =
  | { status: 'authenticated'; user: AuthUser }
  | { status: 'unauthenticated'; user: null }
