/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig

