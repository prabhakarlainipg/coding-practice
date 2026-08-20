import { env } from '../config/env'

export class HttpError extends Error {
  readonly status: number
  readonly details: unknown

  constructor(message: string, status: number, details: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.details = details
  }
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text || null
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    throw new HttpError(
      `Request failed with status ${response.status}`,
      response.status,
      body,
    )
  }

  return body as T
}

/* return body as T is only a TypeScript assertion. It does not prove that the server returned the correct data.
    If the API returned this:
{
  "id": "incorrect"
}
TypeScript would not detect it at runtime. This is why we will later introduce Zod:
    TypeScript validates our code during development; Zod validates external data while the application runs.*/
