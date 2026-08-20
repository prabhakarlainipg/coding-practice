import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { Post } from '../types/post'

type DeletePostContext = {
  previousPosts: Post[] | undefined
}

export function useDeletePost() {
  const queryClient = useQueryClient()

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
    onError: (_error, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.lists(), context.previousPosts)
      }
    },
  })
}
