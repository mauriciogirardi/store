import Image from 'next/image'
import { Card } from '@/components/card'
import { Rating } from '@/components/rating'
import { Tag } from '@/components/tag'
import type { TProduct } from '@/http/get-products'
import { cn } from '@/utils/cn'
import { formatMoney } from '@/utils/format-money'
import { AddCartButton } from './add-cart-button'

interface ListProductProps extends React.ComponentProps<'ul'> {
  products: TProduct[]
  className?: string
}

export function ListProduct({ products, className, ...props }: ListProductProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className,
      )}
      {...props}
    >
      {products?.map((product) => (
        <li key={product.id}>
          <Card className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-end justify-end mb-10">
                <Tag category={product.category} />
              </div>

              <div className="flex flex-col items-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={0}
                  height={0}
                  sizes="150px"
                  loading="eager"
                  className="group-hover:scale-105 transition-transform duration-500 w-37.5 h-auto"
                />
              </div>
            </div>

            <div>
              <div className="mt-5 space-y-3">
                <Rating rating={product.rating} />
                <h2 className="text-center font-semibold">{product.title}</h2>
                <p className="font-bold text-2xl">{formatMoney(product.price)}</p>
              </div>
              <AddCartButton product={product} />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}
