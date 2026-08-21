import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { Post } from '../types/post'
import { useToast } from '../../notifications/hooks/useToast'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useCreatePost() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost) => {
      queryClient.setQueryData<Post[]>(postKeys.lists(), (currentPosts) => {
        if (!currentPosts) return currentPosts
        return [createdPost, ...currentPosts.filter((post) => post.id !== createdPost.id)]
      })
      queryClient.setQueryData(postKeys.detail(createdPost.id), createdPost)
      showToast({
        title: 'Post created',
        message: `Post #${createdPost.id} was added successfully.`,
        variant: 'success',
      })
    },
    onError: (error) => {
      showToast({
        title: 'Creation failed',
        message: getErrorMessage(error, 'create post'),
        variant: 'error',
      })
    },
  })
}
