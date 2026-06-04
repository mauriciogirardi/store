'use client'

import { XIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  className?: string
  children: React.ReactNode
  classNameTitle?: string
}

export function Modal({ open, onClose, title, className, classNameTitle, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current
    if (!dialog) return
    const { left, right, top, bottom } = dialog.getBoundingClientRect()
    const isOnBackdrop =
      e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom
    if (isOnBackdrop) onClose()
  }

  function handleBackdropKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'Escape' && e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      className={cn(
        '[&:not([open])]:hidden',
        'm-auto',
        'backdrop:bg-black/60 backdrop:backdrop-blur-sm',
        'bg-white text-zinc-900 rounded-lg shadow-xl',
        'w-full lg:max-w-200 p-4',
        'flex flex-col gap-4',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {title && <h2 className={cn('text-lg font-semibold', classNameTitle)}>{title}</h2>}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-zinc-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <div>{children}</div>
    </dialog>
  )
}
