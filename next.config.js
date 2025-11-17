/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/Rollermax',
  assetPrefix: '/Rollermax',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

