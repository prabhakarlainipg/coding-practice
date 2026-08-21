import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { Post } from '../types/post'
import { useToast } from '../../notifications/hooks/useToast'
import { getErrorMessage } from '../../../lib/getErrorMessage'

type DeletePostContext = {
  previousPosts: Post[] | undefined
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation<void, Error, number, DeletePostContext>({
    //deletes post
    mutationFn: deletePost,
    onMutate: async (postId) => {
      //1. Cancel active posts requests
      await queryClient.cancelQueries({ queryKey: postKeys.lists() })
/*
      2. Save the current posts
*/

      const previousPosts = queryClient.getQueryData<Post[]>(postKeys.lists())
/*
      Optimistically remove post 2
*/
      queryClient.setQueryData<Post[]>(postKeys.lists(), (currentPosts) =>
        currentPosts?.filter((post) => post.id !== postId),
      )

      return { previousPosts }
    },
    onError: (error, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts)
      }
      showToast({
        title: 'Deletion failed',
        message: getErrorMessage(error, 'delete post'),
        variant: 'error',
      })
    },
    onSuccess: (_data, postId) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(postId) })
      showToast({
        title: 'Post deleted',
        message: `Post #${postId} was removed successfully.`,
        variant: 'success',
      })
    },
  })
}
