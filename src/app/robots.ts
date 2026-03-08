import { MetadataRoute } from 'next';

const BASE_URL = 'https://dr-d-medcare.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/book/success'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
