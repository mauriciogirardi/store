import { z } from 'zod'
import { api, fetchWithRetry } from '@/data/api'

const RatingSchema = z.object({
  rate: z.number().min(0).max(5),
  count: z.number().int().nonnegative(),
})

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(1),
  category: z.string().min(1),
  image: z.url(),
  rating: RatingSchema,
})

export type TProduct = z.infer<typeof ProductSchema>

export async function getProducts(): Promise<TProduct[]> {
  try {
    const response = await fetchWithRetry(() =>
      api('/products?limit=15', {
        next: {
          revalidate: 60 * 60, // 1 hour
        },
      }),
    )

    const products = ProductSchema.array().parse(response)
    return products
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: message
    console.error('Failed to fetch products:', error)
    throw new Error('Failed to load products. Please check your internet connection and try again.')
  }
}
