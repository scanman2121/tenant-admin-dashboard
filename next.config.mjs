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
    ];
  },
};

export default nextConfig;
