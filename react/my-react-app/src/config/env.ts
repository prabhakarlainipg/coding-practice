function getRequiredUrl(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  try {
    return new URL(value).toString().replace(/\/$/, '')
  } catch {
    throw new Error(`${name} must be a valid URL`)
  }
}

export const env = {
  apiBaseUrl: getRequiredUrl(
    'VITE_API_BASE_URL',
    import.meta.env.VITE_API_BASE_URL,
  ),
} as const
