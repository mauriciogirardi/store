import { api } from '@/data/api'

export type TProduct = {
  id: number
  title: string
  price: number
  formatPrice: string
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export async function getProducts() {
  const products = await api<TProduct[]>('/products?limit=15', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  return products
}
