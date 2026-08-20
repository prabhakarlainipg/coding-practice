import { z } from 'zod'

/*Positive integer userId
Positive integer id
Non-empty string title
Non-empty string body*/
export const postSchema = z.object({
  userId: z.number().int().positive(),
  id: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
})

export const postsSchema = z.array(postSchema)

/*
This line creates the TypeScript type from the schema:
*/
export type Post = z.infer<typeof postSchema>
