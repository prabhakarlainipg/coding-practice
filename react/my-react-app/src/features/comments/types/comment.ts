import { z } from 'zod'

export const commentSchema = z.object({
  postId: z.number().int().positive(),
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.email(),
  body: z.string().min(1),
})

export const commentsSchema = z.array(commentSchema)

export type Comment = z.infer<typeof commentSchema>
