/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/my-hqo",
        permanent: true,
      },
      {
        source: "/overview",
        destination: "/my-hqo",
        permanent: true,
      },
      // Add redirect from old users page to new one
      {
        source: "/settings/users",
        destination: "/users",
        permanent: true,
      },
      // Remove the problematic redirects that are causing infinite loops
    ];
  },
  // Add output configuration to ensure static files are generated properly
  output: 'standalone',
  // Ensure proper asset handling
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
