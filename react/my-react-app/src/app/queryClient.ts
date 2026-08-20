import { QueryClient } from '@tanstack/react-query'
import { ZodError } from 'zod'
import { HttpError } from '../lib/httpClient'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
/*
      posts are considered fresh for five minutes.
*/
      staleTime: 5 * 60 * 1000,
/*
      an unused posts cache can remain in memory for thirty minutes.
*/
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof ZodError) return false
        if (error instanceof HttpError && error.status < 500) return false
        return failureCount < 2
      },
    },
  },
})
