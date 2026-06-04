import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getProducts } from './get-products'

vi.mock('@/data/api', () => ({
  api: vi.fn(),
  fetchWithRetry: vi.fn((fetcher) => fetcher()),
}))

import { api } from '@/data/api'

const validProduct = {
  id: 1,
  title: 'Wireless Headphones',
  price: 49.99,
  description: 'Great headphones.',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/headphones.jpg',
  rating: { rate: 4.5, count: 200 },
}

describe('getProducts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should return a list of valid products', async () => {
    vi.mocked(api).mockResolvedValue([validProduct])
    const products = await getProducts()
    expect(products).toHaveLength(1)
    expect(products[0]).toMatchObject(validProduct)
  })

  it('should call the correct API endpoint', async () => {
    vi.mocked(api).mockResolvedValue([validProduct])
    await getProducts()
    expect(api).toHaveBeenCalledWith('/products?limit=15', expect.any(Object))
  })

  it('should throw when the API returns invalid data', async () => {
    vi.mocked(api).mockResolvedValue([{ id: 'not-a-number' }])
    await expect(getProducts()).rejects.toThrow('Failed to load products')
  })

  it('should throw when the API call fails', async () => {
    vi.mocked(api).mockRejectedValue(new Error('Network error'))
    await expect(getProducts()).rejects.toThrow('Failed to load products')
  })

  it('should return an empty array when the API returns an empty list', async () => {
    vi.mocked(api).mockResolvedValue([])
    const products = await getProducts()
    expect(products).toEqual([])
  })
})
