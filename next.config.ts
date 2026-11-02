import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default; 90 is used for the text-heavy article thumbnails so small type stays crisp
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dr-d-medcare.vercel.app' }],
        destination: 'https://drdmedcare.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.drdmedcare.com' }],
        destination: 'https://drdmedcare.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
