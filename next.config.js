/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false,
  },
  // Force fresh deployment with cache busting
  env: {
    DEPLOY_TIME: new Date().getTime().toString(),
    CACHE_BUST: '2024-09-27-mobile-fix-final',
  },
}

module.exports = nextConfig