import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPostById, getPosts } from '../api/postsApi'
import type { Post } from '../types/post'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (postId: number) => [...postKeys.details(), postId] as const,
}

export function usePost(postId: number) {
  const queryClient = useQueryClient()
/*
  Before requesting the detail endpoint,
  the hook checks the existing posts-list cache:
  When navigating from the list:
The post appears immediately from existing cache.
The detail request runs in the background.
The response replaces the placeholder.
The detail result receives its own cache entry.
placeholderData is temporary display data. It is not automatically treated as a successful detail fetch.
*/
  const placeholderPost = queryClient
    .getQueryData<Post[]>(postKeys.lists())
    ?.find((post) => post.id === postId)

  //It passes that record to the detail query:
  return useQuery<Post>({
    queryKey: postKeys.detail(postId),
    queryFn: ({ signal }) => getPostById(postId, signal),
    placeholderData: placeholderPost,
  })
}

export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: ({ signal }) => getPosts(signal),
  })
}
