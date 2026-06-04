import { cn } from '@/utils/cn'

interface CardProps extends React.ComponentProps<'div'> {
  className?: string
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('bg-white rounded-md shadow-md p-4 border-[0.5px] border-zinc-300', className)}
      {...props}
    />
  )
}
