import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { APIError, api, fetchWithRetry } from './api'

vi.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'https://fakestoreapi.com',
    NEXT_PUBLIC_MAX_RETRIES: 3,
    NEXT_PUBLIC_RETRY_DELAY: 0,
  },
}))

describe('APIError', () => {
  it('should have name APIError', () => {
    const error = new APIError('something went wrong')
    expect(error.name).toBe('APIError')
  })

  it('should set the message', () => {
    const error = new APIError('something went wrong')
    expect(error.message).toBe('something went wrong')
  })

  it('should set the statusCode when provided', () => {
    const error = new APIError('not found', 404)
    expect(error.statusCode).toBe(404)
  })

  it('should have undefined statusCode when not provided', () => {
    const error = new APIError('error')
    expect(error.statusCode).toBeUndefined()
  })

  it('should be an instance of Error', () => {
    expect(new APIError('error')).toBeInstanceOf(Error)
  })
})

describe('api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return parsed JSON on a successful response', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ id: 1 }), { status: 200 }),
    )
    const data = await api<{ id: number }>('/products/1')
    expect(data).toEqual({ id: 1 })
  })

  it('should throw APIError when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(null, { status: 404, statusText: 'Not Found' }),
    )
    await expect(api('/products/999')).rejects.toMatchObject({
      name: 'APIError',
      statusCode: 404,
    })
  })

  it('should throw APIError with statusCode 0 on network error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network failure'))
    await expect(api('/products')).rejects.toMatchObject({
      name: 'APIError',
      statusCode: 0,
    })
  })

  it('should call fetch with the correct URL', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    )
    await api('/products')
    expect(fetch).toHaveBeenCalledWith(
      new URL('/products', 'https://fakestoreapi.com'),
      undefined,
    )
  })

  it('should forward init options to fetch', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    )
    const init = { method: 'POST' }
    await api('/products', init)
    expect(fetch).toHaveBeenCalledWith(expect.any(URL), init)
  })
})

describe('fetchWithRetry', () => {
  it('should return the result when fetcher succeeds on the first try', async () => {
    const fetcher = vi.fn().mockResolvedValue('ok')
    const result = await fetchWithRetry(fetcher, 3)
    expect(result).toBe('ok')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('should retry and succeed on a subsequent attempt', async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok')
    const result = await fetchWithRetry(fetcher, 3)
    expect(result).toBe('ok')
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('should throw the last error after all retries are exhausted', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('always fails'))
    await expect(fetchWithRetry(fetcher, 3)).rejects.toThrow('always fails')
    expect(fetcher).toHaveBeenCalledTimes(3)
  })

  it('should wrap non-Error throws in an Error', async () => {
    const fetcher = vi.fn().mockRejectedValue('string error')
    await expect(fetchWithRetry(fetcher, 1)).rejects.toThrow('Unknown error')
  })
})
