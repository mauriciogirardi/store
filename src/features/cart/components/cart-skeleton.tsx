import { Card } from '@/components/card'
import { Skeleton } from '@/components/skeleton'

function CartItemSkeleton() {
  return (
    <Card>
      <div className="flex items-start gap-6">
        <Skeleton className="w-28 h-24 shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-32 h-8" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-10 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-20 h-8 ml-2" />
          </div>
        </div>
      </div>
    </Card>
  )
}

function CartSummarySkeleton() {
  return (
    <Card className="h-min sticky top-24">
      <Skeleton className="w-40 h-7" />
      <div className="h-px w-full bg-zinc-200 my-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-10 h-6" />
      </div>
      <div className="h-px w-full bg-zinc-200 my-2" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-24 h-8" />
      </div>
      <div className="flex items-center gap-4 mt-5">
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="flex-1 h-10" />
      </div>
    </Card>
  )
}

export function CartFeatureSkeleton() {
  return (
    <section className="grid grid-cols-3 gap-4" aria-busy="true" aria-label="Loading cart...">
      <div className="col-span-2 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CartItemSkeleton key={`skeleton-cart-${i.toString()}`} />
        ))}
      </div>
      <CartSummarySkeleton />
    </section>
  )
}
