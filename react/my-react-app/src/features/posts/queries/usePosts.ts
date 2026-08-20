import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/postsApi'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
}

export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: ({ signal }) => getPosts(signal),
  })
}
