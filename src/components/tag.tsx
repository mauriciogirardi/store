import { cn } from '@/utils/cn'

interface TagProps extends React.ComponentProps<'span'> {
  category?: string
}

export function Tag({ category, className, ...props }: TagProps) {
  if (!category) return null

  return (
    <span
      className={cn(
        'bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize',
        className,
      )}
      {...props}
    >
      {category}
    </span>
  )
}
