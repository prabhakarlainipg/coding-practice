import { request } from '../../../lib/httpClient'
import { commentsSchema } from '../types/comment'
import type { Comment } from '../types/comment'

export async function getCommentsByPostId(
  postId: number,
  signal?: AbortSignal,
): Promise<Comment[]> {
  const data = await request<unknown>(`/posts/${postId}/comments`, { signal })
  return commentsSchema.parse(data)
}
