/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // enable static export output
  output: 'export', // This line is being set for static export builds
  trailingSlash: true,
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig

