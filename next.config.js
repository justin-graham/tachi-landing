/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure CSS is properly handled in production
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig