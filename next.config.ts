import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dr-d-medcare.vercel.app' }],
        destination: 'https://drdmedcare.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
