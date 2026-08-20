import { useQuery } from '@tanstack/react-query'
import { getCommentsByPostId } from '../api/commentsApi'

export const commentKeys = {
  all: ['comments'] as const,
  byPost: (postId: number) => [...commentKeys.all, 'post', postId] as const,
}

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: commentKeys.byPost(postId),
    queryFn: ({ signal }) => getCommentsByPostId(postId, signal),
  })
}
