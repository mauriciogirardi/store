import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react'

interface QuantitySelectorProps {
  quantity: number
  label: string
  onIncrease: () => void
  onDecrease: () => void
  onRemove?: () => void
  min?: number
  max?: number
  error?: string
}

export function QuantitySelector({
  quantity,
  label,
  onIncrease,
  onDecrease,
  min,
  max,
  error,
  onRemove,
}: QuantitySelectorProps) {
  return (
    <div>
      <fieldset
        className="flex items-center gap-2 mt-4 bg-zinc-100 w-min p-1 rounded-sm border-none"
        aria-label={`Quantity of ${label}`}
      >
        <button
          type="button"
          onClick={onDecrease}
          disabled={min !== undefined && quantity <= min}
          aria-label={`Decrease quantity of ${label}`}
          className="bg-zinc-300 flex items-center justify-center w-5 h-5 rounded-sm cursor-pointer hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <MinusIcon className="size-3" aria-hidden="true" />
        </button>
        <span className="font-semibold text-sm" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={max !== undefined && quantity >= max}
          aria-label={`Increase quantity of ${label}`}
          className="bg-zinc-300 flex items-center justify-center w-5 h-5 rounded-sm cursor-pointer hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <PlusIcon className="size-3" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label} from cart`}
          className="bg-red-100 flex items-center justify-center w-5 h-5 text-red-900 rounded-sm cursor-pointer hover:bg-red-200 ml-3"
        >
          <Trash2 className="size-3" aria-hidden="true" />
        </button>
      </fieldset>
      {error && (
        <p className="text-red-500 text-xs mt-2 bg-red-100 rounded-sm p-1 w-max" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
