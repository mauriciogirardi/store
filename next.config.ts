import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
}

export default nextConfig
