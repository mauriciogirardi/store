import { ListProduct } from '@/components/list-products'
import { getProducts } from '@/http/get-products'

export default async function HomePage() {
  const products = await getProducts()

  return <ListProduct products={products} />
}
