import type { Metadata } from 'next'
import { CartFeature } from '@/features/cart/cart'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage the items in your shopping cart.',
  robots: {
    index: false,
  },
}

export default function PageCart() {
  return <CartFeature />
}
