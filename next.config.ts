import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async redirects() {
    return [
      // The site lives under /it and /en. Temporary, so the default language
      // can change without browsers caching the redirect forever.
      // Keep in sync with defaultLocale in src/i18n/config.ts.
      { source: '/', destination: '/it', permanent: false },
      // Project pages published before the language split were in English.
      {
        source: '/works/:slug',
        destination: '/en/works/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
