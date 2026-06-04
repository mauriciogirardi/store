import Image from 'next/image'
import { Card } from '@/components/card'
import { MAXIMUM_QUANTITY_ALLOWED_BY_ITEM } from '@/constants/cart'
import type { TProduct } from '@/http/get-products'
import { formatMoney } from '@/utils/format-money'
import { QuantitySelector } from './quantity-selector'

interface CartItemsProps {
  product: TProduct
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export function CartItems({ product, quantity, onIncrease, onDecrease, onRemove }: CartItemsProps) {
  return (
    <Card>
      <div className="flex items-start gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={112}
          height={112}
          loading="eager"
          className="w-auto h-24 max-w-28"
        />
        <div className="space-y-3">
          <h3 className="text-lg md:text-2xl font-semibold">{product.title}</h3>
          <p className="text-sm leading-tight line-clamp-2">{product.description}</p>
          <div>
            {quantity > 1 && (
              <p className="text-xs font-semibold text-zinc-500">
                <span className="sr-only">Unit price: </span>
                {formatMoney(product.price)}/un
              </p>
            )}
            <p className="text-2xl font-bold">
              <span className="sr-only">Total price: </span>
              {formatMoney(product.price * quantity)}
            </p>
          </div>

          <QuantitySelector
            quantity={quantity}
            label={product.title}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
            max={MAXIMUM_QUANTITY_ALLOWED_BY_ITEM}
            min={1}
            error={
              quantity >= MAXIMUM_QUANTITY_ALLOWED_BY_ITEM
                ? 'You have reached the maximum quantity allowed for this item.'
                : undefined
            }
          />
        </div>
      </div>
    </Card>
  )
}
