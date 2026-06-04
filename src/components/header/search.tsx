'use client'
import { SearchIcon, XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { PATHS } from '@/constants/paths'

export function Search() {
  const pathname = usePathname()

  if (pathname === PATHS.CART) return null

  return (
    <search>
      <form
        aria-label="Product search"
        className="flex w-full md:w-[320px] items-center bg-zinc-200 gap-3 rounded-full px-5 py-4 ring-zinc-700"
      >
        <SearchIcon className="size-5 text-zinc-500" aria-hidden="true" />
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="Search products..."
          autoComplete="off"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        />
        <button
          type="button"
          aria-label="Clear search"
          className="cursor-pointer text-zinc-500 hover:text-zinc-700"
        >
          <XIcon className="size-5" aria-hidden="true" />
        </button>
      </form>
    </search>
  )
}
