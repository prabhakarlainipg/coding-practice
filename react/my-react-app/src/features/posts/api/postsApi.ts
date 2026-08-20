import { request } from '../../../lib/httpClient'
import { postSchema, postsSchema } from '../types/post'
import type { CreatePostInput, Post } from '../types/post'

export async function getPosts(signal?: AbortSignal): Promise<Post[]> {
  const data = await request<unknown>('/posts', { signal })
 /* If it is invalid, parse() throws a ZodError
  If the response is valid, parse() returns Post[].*/
  return postsSchema.parse(data)
}

export async function getPostById(
  postId: number,
  signal?: AbortSignal,
): Promise<Post> {
  const data = await request<unknown>(`/posts/${postId}`, { signal })
  return postSchema.parse(data)
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const data = await request<unknown>('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  return postSchema.parse(data)
}
/*
The non-throwing alternative is:
    const result = postSchema.safeParse(data)

if (result.success) {
  console.log(result.data)
} else {
  console.log(result.error)
 safeParse() is useful when validation failure is an expected branch, especially in forms
  parse() works well at an API boundary where invalid server data is an exceptional condition.
}*/
