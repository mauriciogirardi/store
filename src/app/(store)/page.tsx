import type { Metadata } from 'next'
import { StoreFeature } from '@/features/store/store'
import { getProducts } from '@/http/get-products'

export const metadata: Metadata = {
  title: 'Loja - Produtos em Destaque',
  description: 'Explore nossa coleção de produtos com os melhores preços do mercado. Centenas de itens disponíveis em diferentes categorias.',
  openGraph: {
    title: 'Loja - Produtos em Destaque',
    description: 'Explore nossa coleção de produtos com os melhores preços do mercado.',
    type: 'website',
  },
}

export default async function HomePage() {
  const products = await getProducts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Store - Comparação de Preços',
    description: 'Mini-loja com comparação de preços. Encontre os melhores produtos com os melhores preços.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.slice(0, 12).map((product, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: product.title,
        description: product.description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price.toString(),
          priceCurrency: 'BRL',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating.rate.toString(),
          reviewCount: product.rating.count,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreFeature products={products} />
    </>
  )
}
