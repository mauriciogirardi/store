import type { Metadata } from 'next'
import { CartFeature } from '@/features/cart/cart'

export const metadata: Metadata = {
  title: 'Carrinho de Compras',
  description: 'Visualize e gerencie os itens no seu carrinho de compras.',
  robots: {
    index: false,
  },
}

export default function PageCart() {
  return <CartFeature />
}
