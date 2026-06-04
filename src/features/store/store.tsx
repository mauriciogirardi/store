import type { TProduct } from '@/http/get-products'
import { ListProduct } from './components/list-products'

interface StoreFeatureProps {
  products: TProduct[]
}

export function StoreFeature({ products }: StoreFeatureProps) {
  return <ListProduct products={products} />
}
