'use client'

import { ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { MAXIMUM_QUANTITY_ALLOWED_BY_ITEM } from '@/constants/cart'
import { PATHS } from '@/constants/paths'
import type { TProduct } from '@/http/get-products'
import { useCartStore } from '@/stores/cart'
import { cn } from '@/utils/cn'
import { formatMoney } from '@/utils/format-money'

interface AddCartButtonProps {
  product: TProduct
}

export function AddCartButton({ product }: AddCartButtonProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { addToCart } = useCartStore()
  const items = useCartStore((state) => state.items)

  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0
  const isAtMaxQuantity = quantity >= MAXIMUM_QUANTITY_ALLOWED_BY_ITEM

  const handleAddToCart = () => {
    if (isAtMaxQuantity) {
      setOpen(true)
      return
    }

    addToCart(product)
    setOpen(true)
  }

  const handleContinueBuying = () => {
    setOpen(false)
  }

  const handleGoToCart = () => {
    setOpen(false)
    router.push(PATHS.CART)
  }

  return (
    <>
      <Modal
        classNameTitle={cn(
          'rounded-sm px-2',
          isAtMaxQuantity ? 'text-red-600 bg-red-100' : 'text-green-700 bg-green-100',
        )}
        title={
          isAtMaxQuantity
            ? `Maximum quantity (${MAXIMUM_QUANTITY_ALLOWED_BY_ITEM}) reached`
            : 'Product added successfully'
        }
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
          <Image
            src={product.image}
            alt={product.title}
            width={0}
            height={0}
            sizes="150px"
            loading="eager"
            className="w-37.5 h-auto"
          />
          <div className="space-y-3 mt-9 md:mt-0">
            <h3 className="text-lg md:text-2xl font-semibold">{product.title}</h3>
            <p className="text-sm leading-tight">{product.description}</p>
            <p className="text-3xl font-extrabold">{formatMoney(product.price)}</p>
            {isAtMaxQuantity && (
              <p className="text-sm text-red-600 font-medium">
                You already have {quantity} of this item in your cart. Remove some if you want to add more.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={handleContinueBuying}>
            {isAtMaxQuantity ? 'Close' : 'Continue Shopping'}
          </Button>
          <Button onClick={handleGoToCart}>Go to Cart</Button>
        </div>
      </Modal>

      <Button
        aria-label={`Add ${product.title} to cart`}
        onClick={handleAddToCart}
        disabled={isAtMaxQuantity}
        title={isAtMaxQuantity ? `Maximum quantity (${MAXIMUM_QUANTITY_ALLOWED_BY_ITEM}) reached` : ''}
      >
        <ShoppingCartIcon className="size-5" aria-hidden="true" />
        {isAtMaxQuantity ? 'Max Quantity' : 'Add to Cart'}
      </Button>
    </>
  )
}
