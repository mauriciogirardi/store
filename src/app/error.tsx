'use client'

import { useEffect } from 'react'
import { Button } from '@/components/button'
import { PATHS } from '@/constants/paths'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: message
    console.error('Error:', error)
  }, [error])

  const isProductsError = error?.message?.includes('product')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong</h1>
        <p className="text-zinc-600 mb-6">
          {isProductsError
            ? "We couldn't load the products right now. This could be a temporary network issue."
            : 'An unexpected error occurred. Please try again or come back later.'}
        </p>

        {error?.message && (
          <p className="text-sm text-zinc-500 bg-zinc-100 p-3 rounded mb-6 text-left">
            {error.message}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button
            onClick={() => {
              window.location.href = PATHS.STORE
            }}
            className="mt-5 px-6 py-3 font-semibold bg-zinc-200 text-zinc-900 rounded-sm hover:bg-zinc-300"
          >
            Go Store
          </Button>
        </div>
      </div>
    </div>
  )
}
