import { ZodError } from 'zod'
import { HttpError } from './httpClient'

export function getErrorMessage(error: unknown, resource: string): string {
  if (error instanceof HttpError) {
    return `The ${resource} request failed (${error.status}).`
  }
  if (error instanceof ZodError) {
    return 'The API returned data in an unexpected format.'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred.'
}
