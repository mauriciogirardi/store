import { Header } from '@/components/header'

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto grid grid-rows-[min-content_max-content] min-h-screen w-full max-w-400 gap-14 p-4 md:p-8">
      <Header />
      {children}
    </div>
  )
}
