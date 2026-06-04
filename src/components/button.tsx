import { cn } from '@/utils/cn'

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'w-full mt-5 flex font-semibold items-center gap-2 cursor-pointer justify-center text-white bg-blue-400 rounded-sm h-12 hover:bg-blue-500',
        'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-blue-400',
        className,
      )}
      {...props}
    />
  )
}
