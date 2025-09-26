/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false,
  },
  // Add these to ensure CSS works properly in production
  compiler: {
    removeConsole: false,
  },
  // Ensure CSS is processed correctly
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      styles: {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      },
    }
    return config
  },
}

module.exports = nextConfig