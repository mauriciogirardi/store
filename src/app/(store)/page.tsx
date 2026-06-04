import type { Metadata } from 'next'
import { env } from '@/env'
import { StoreFeature } from '@/features/store/store'
import { getProducts } from '@/http/get-products'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore our product collection with the best prices on the market. Hundreds of items available across different categories.',
  openGraph: {
    title: 'Products',
    description: 'Explore our product collection with the best prices on the market.',
    type: 'website',
  },
}

export default async function HomePage() {
  const products = await getProducts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Store - Price Comparison',
    description: 'Mini-store with price comparison. Find the best products at the best prices.',
    url: env.NEXT_PUBLIC_BASE_URL,
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
          priceCurrency: 'EUR',
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe — JSON.stringify escapes special chars and data comes from a trusted API
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreFeature products={products} />
    </>
  )
}
