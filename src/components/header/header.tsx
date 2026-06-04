import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import { CartButton } from './cart-button'
import { Search } from './search'

export function Header() {
  return (
    <header className="mx-auto w-full px sticky top-0 z-50 bg-white p-4  md:px-8 border-b-[0.5px] border-zinc-200 shadow-xs">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 md:gap-7">
          <Link href={PATHS.STORE} className="font-bold text-3xl">
            <span className="text-blue-500 animate-pulse">S</span>tore
          </Link>

          <Search />
        </div>

        <div className="flex items-center gap-10">
          <CartButton />
          <div className="items-center gap-2 hidden md:flex">
            <span>Account</span>
            <div className="flex items-center bg-zinc-400 justify-center rounded-full w-9 h-9">
              <UserIcon className="size" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
