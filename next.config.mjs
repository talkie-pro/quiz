/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
