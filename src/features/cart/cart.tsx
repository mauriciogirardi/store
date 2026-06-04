'use client'

import { MAXIMUM_QUANTITY_ALLOWED_BY_ITEM } from '@/constants/cart'
import { useCartStore } from '@/stores/cart'
import { CartItems } from './components/cart-item'
import { CartSummary } from './components/cart-summary'
import { EmptyCart } from './components/empty-cart'

export function CartFeature() {
  const { quantity, total, items } = useCartStore((state) => state)
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCartStore.getState()

  const hasMaxQuantityError = items.some(
    (item) => item.quantity >= MAXIMUM_QUANTITY_ALLOWED_BY_ITEM,
  )

  if (!quantity) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 flex flex-col gap-4">
        {items.map((item) => (
          <CartItems
            key={item.id}
            product={item}
            quantity={item.quantity}
            onDecrease={() => decreaseQuantity(item.id)}
            onIncrease={() => increaseQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>
      <CartSummary quantity={quantity} total={total} hasMaxQuantityError={hasMaxQuantityError} />
    </div>
  )
}
