'use client'

import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import { useCartStore } from '@/stores/cart'

export function CartButton() {
  const quantity = useCartStore((state) => state.quantity)

  return (
    <Link
      prefetch
      href={PATHS.CART}
      aria-label={
        quantity
          ? `Cart, ${quantity > 99 ? 'more than 99' : quantity} ${quantity === 1 ? 'item' : 'items'}`
          : 'Cart'
      }
      className="flex items-center gap-2 relative cursor-pointer"
    >
      <ShoppingCartIcon className="size-5" aria-hidden />
      {!!quantity && (
        <div
          aria-hidden
          className="text-[10px] font-semibold bg-red-400 rounded-full w-5 h-5 flex items-center justify-center -top-4  right-4 md:-right-4 absolute"
        >
          {quantity > 99 ? '99+' : quantity}
        </div>
      )}
    </Link>
  )
}
