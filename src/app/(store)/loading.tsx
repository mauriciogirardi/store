import { Skeleton } from '@/components/skeleton'

export default function LoadingStore() {
  return (
    <output
      aria-label="Loading products..."
      aria-busy="true"
      className={'grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`skeleton-store-${i.toString()}`} aria-hidden="true">
          <div className="bg-white group rounded-2xl shadow-md px-4 py-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-end justify-end mb-10">
                <Skeleton className="w-28 h-6 rounded-full" />
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="w-full h-52" />
              </div>
            </div>

            <div>
              <div className="mt-5 space-y-4">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-36 h-8" />
              </div>
              <Skeleton className="w-full h-12 mt-8" />
            </div>
          </div>
        </div>
      ))}
    </output>
  )
}
