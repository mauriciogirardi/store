import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { env } from '@/env'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Store',
    template: `%s | Store`,
  },
  robots: {
    follow: true,
    index: true,
  },
  description: 'Mini store. Find the best products at the best prices.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.NEXT_PUBLIC_BASE_URL,
    title: 'Store ',
    description: 'Mini store. Find the best products at the best prices.',
    siteName: 'Store',
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="bg-zinc-100">{children}</body>
    </html>
  )
}
