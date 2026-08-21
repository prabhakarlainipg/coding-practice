import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { CreatePostInput, Post } from '../types/post'
import { useToast } from '../../notifications/hooks/useToast'
import { getErrorMessage } from '../../../lib/getErrorMessage'

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation({
    mutationFn: (input: CreatePostInput) => updatePost(postId, input),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(postId), updatedPost)
      queryClient.setQueriesData<Post[]>(
        { queryKey: postKeys.lists() },
        (currentPosts) =>
          currentPosts?.map((post) =>
            post.id === updatedPost.id ? updatedPost : post,
          ),
      )
      showToast({
        title: 'Changes saved',
        message: `Post #${updatedPost.id} was updated successfully.`,
        variant: 'success',
      })
    },
    onError: (error) => {
      showToast({
        title: 'Update failed',
        message: getErrorMessage(error, 'update post'),
        variant: 'error',
      })
    },
  })
}
