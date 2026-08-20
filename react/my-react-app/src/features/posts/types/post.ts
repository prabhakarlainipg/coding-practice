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

export const createPostSchema = z.object({
  userId: z.number().int().min(1, 'User ID must be at least 1').max(10),
  title: z.string().trim().min(5, 'Title must contain at least 5 characters').max(100),
  body: z.string().trim().min(10, 'Body must contain at least 10 characters').max(500),
})

/*
This line creates the TypeScript type from the schema:
*/
export type Post = z.infer<typeof postSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
