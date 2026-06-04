import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex items-center justify-center rounded-full bg-zinc-100 p-6">
        <ShoppingCartIcon className="size-12 text-zinc-400" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-zinc-800">Your cart is empty</h2>
        <p className="text-sm text-zinc-500">
          Looks like you haven&apos;t added anything yet. Start shopping!
        </p>
      </div>

      <Link
        href={PATHS.STORE}
        className="rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
      >
        Browse products
      </Link>
    </div>
  )
}
