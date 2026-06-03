'use client'

import { useEffect } from 'react'
import { Button } from '@/components/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO: Replace with your error monitoring service (e.g. Sentry.captureException(error))
    // biome-ignore lint/suspicious/noConsole: intentional error logging
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground whitespace-pre-line text-center text-sm">
        {`An unexpected error occurred. \n Please try again or come back later.`}
      </p>
      <Button onClick={reset} className="w-60">
        Try Again
      </Button>
    </div>
  )
}
