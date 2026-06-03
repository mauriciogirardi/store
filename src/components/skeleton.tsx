import { cn } from '@/utils/cn'

interface SkeletonProps extends React.ComponentProps<'div'> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('bg-zinc-200 animate-pulse rounded-md w-full', className)} {...props} />
}
