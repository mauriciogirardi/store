import { env } from '@/env'

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

export async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  maxRetries = MAX_RETRIES,
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetcher()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (i + 1)))
      }
    }
  }

  throw lastError
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  try {
    const response = await fetch(url, init)

    if (!response.ok) {
      throw new APIError(`API error: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Failed to fetch from API. Please check your connection.', 0)
  }
}
