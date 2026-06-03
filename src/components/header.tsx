import { SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-7">
        <Link href="/" className="font-bold text-3xl">
          <span className="text-blue-500 animate-pulse">S</span>tore
        </Link>

        <form className="flex w-full md:w-[320px] items-center bg-zinc-200 gap-3 rounded-full px-5 py-4 ring-zinc-700">
          <SearchIcon className="size-5 text-zinc-500" />
          <input
            placeholder="Search products..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
          <button
            type="button"
            aria-label="Clear search"
            className="cursor-pointer text-zinc-500 hover:text-zinc-700"
          >
            <XIcon className="size-5" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 relative">
          <ShoppingCartIcon className="size-5" />
          <div className="text-sm bg-red-400 rounded-full w-5 h-5 flex items-center justify-center -top-4  right-4 md:-right-4 absolute">
            0
          </div>
        </div>

        <div className="items-center gap-2 hidden md:flex">
          <span>Account</span>
          <div className="flex items-center bg-zinc-400 justify-center rounded-full w-9 h-9">
            <UserIcon className="size" />
          </div>
        </div>
      </div>
    </header>
  )
}
