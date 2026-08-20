import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { Post } from '../types/post'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost) => {
      queryClient.setQueryData<Post[]>(postKeys.lists(), (currentPosts) => {
        if (!currentPosts) return currentPosts
        return [createdPost, ...currentPosts.filter((post) => post.id !== createdPost.id)]
      })
      queryClient.setQueryData(postKeys.detail(createdPost.id), createdPost)
    },
  })
}
