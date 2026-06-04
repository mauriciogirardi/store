'use client'

import { AlertCircle, BoxIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { MAXIMUM_QUANTITY_ALLOWED_BY_ITEM } from '@/constants/cart'
import { PATHS } from '@/constants/paths'
import { formatMoney } from '@/utils/format-money'

interface CartSummaryProps {
  quantity: number
  total: number
  hasMaxQuantityError: boolean
}

export function CartSummary({ quantity, total, hasMaxQuantityError }: CartSummaryProps) {
  const router = useRouter()

  return (
    <Card className="h-min sticky top-24">
      <p className="font-semibold text-2xl text-zinc-700">Order Summary</p>
      <div className="h-px w-full bg-zinc-200 my-3" />
      <div className="items-center flex justify-between">
        <span className="font-semibold text-lg text-zinc-700">Items</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-zinc-700">{quantity}</span>
          <BoxIcon className="size-4" />
        </div>
      </div>
      <div className="h-px w-full bg-zinc-200 my-2" />
      <div className="items-center flex justify-between">
        <span className="font-semibold text-lg text-zinc-700">Total</span>
        <span className="font-extrabold text-2xl text-zinc-700">{formatMoney(total)}</span>
      </div>

      {hasMaxQuantityError && (
        <div className="flex items-start gap-2 p-3 rounded-sm bg-red-50 border border-red-200 mt-4">
          <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-sm font-medium text-red-800">
              Some items have reached the maximum quantity ({MAXIMUM_QUANTITY_ALLOWED_BY_ITEM})
            </p>
            <p className="text-xs text-red-700 mt-1">
              Reduce the quantity of these items to proceed with checkout.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-5">
        <Button onClick={() => router.push(PATHS.STORE)}>Continue Shopping</Button>
        <Button disabled={hasMaxQuantityError || quantity === 0}>Checkout</Button>
      </div>
    </Card>
  )
}
