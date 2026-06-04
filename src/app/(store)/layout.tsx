import { Header } from '@/components/header/header'

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto grid grid-rows-[min-content_max-content] flex-1 w-full max-w-400 gap-14 p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
