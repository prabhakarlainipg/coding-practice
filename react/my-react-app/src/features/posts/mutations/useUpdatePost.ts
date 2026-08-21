import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../api/postsApi'
import { postKeys } from '../queries/usePosts'
import type { CreatePostInput, Post } from '../types/post'

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient()

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
    },
  })
}
