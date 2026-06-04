import Link from 'next/link'
import { PATHS } from '@/constants/paths'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-zinc-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center items-center flex-wrap">
          <Link
            href={PATHS.STORE}
            className="w-full mt-5 flex font-semibold items-center gap-2 cursor-pointer justify-center text-white bg-blue-400 rounded-sm h-12 hover:bg-blue-500"
          >
            Go to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
