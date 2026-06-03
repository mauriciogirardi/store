import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

interface RatingProps extends React.ComponentProps<'div'> {
  rating: {
    rate: number
    count: number
  }
  className?: string
}

export function Rating({ rating, className, ...props }: RatingProps) {
  const { rate, count } = rating
  const fullStars = Math.floor(rate)
  const partialFill = Math.round((rate % 1) * 100)
  const totalStars = 5

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      role="img"
      aria-label={`Rating: ${rate} out of 5 stars, based on ${count} reviews`}
      {...props}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: totalStars }, (_, i) => {
          const isFull = i < fullStars
          const isPartial = i === fullStars && partialFill > 0
          const starNumber = i + 1

          return (
            <span key={starNumber} className="relative inline-block">
              <Star className="text-zinc-300 dark:text-zinc-600" size={16} fill="currentColor" />
              {(isFull || isPartial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isFull ? '100%' : `${partialFill}%` }}
                >
                  <Star className="text-yellow-400" size={16} fill="currentColor" />
                </span>
              )}
            </span>
          )
        })}
      </div>

      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{rate.toFixed(1)}</span> (
        {count.toLocaleString('pt-BR')})
      </span>
    </div>
  )
}
