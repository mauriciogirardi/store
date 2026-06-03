import { env } from '@/env'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  const response = await fetch(url, init)
  return response.json() as Promise<T>
}
