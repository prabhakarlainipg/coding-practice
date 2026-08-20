import { request } from '../../../lib/httpClient'
import type { Post } from '../types/post'

export function getPosts(signal?: AbortSignal): Promise<Post[]> {
  return request<Post[]>('/posts', { signal })
}

export function getPostById(
  postId: number,
  signal?: AbortSignal,
): Promise<Post> {
  return request<Post>(`/posts/${postId}`, { signal })
}
