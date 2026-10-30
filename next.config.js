/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for App Router
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
