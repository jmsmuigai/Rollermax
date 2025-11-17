/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages, use basePath if deploying to a subdirectory
  // Uncomment the line below if your site URL is https://jmsmuigai.github.io/Rollermax/
  // basePath: '/Rollermax',
  // assetPrefix: '/Rollermax',
}

module.exports = nextConfig

