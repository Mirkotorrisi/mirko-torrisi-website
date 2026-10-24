// Single source of truth for site-wide SEO and identity data.
// Update here; metadata, sitemap, robots, JSON-LD and contact links all read from it.

export const SITE = {
  url: 'https://mirkotorrisi.it',
  name: 'Mirko Torrisi',
  jobTitle: 'Full Stack Developer',
  title: 'Mirko Torrisi – Full Stack Developer | React, Next.js, NestJS',
  description:
    'Full Stack Developer based in Catania, working remotely. I build web platforms, B2B dashboards and microservices with React, Next.js, TypeScript and NestJS.',
  locale: 'en_US',
  city: 'Catania',
  region: 'Sicily',
  country: 'IT',
  social: {
    github: 'https://github.com/Mirkotorrisi',
    linkedin: 'https://www.linkedin.com/in/mirko-torrisi/',
  },
  keywords: [
    'Full Stack Developer',
    'Freelance developer',
    'Sviluppatore freelance Catania',
    'React developer',
    'Next.js developer',
    'NestJS',
    'TypeScript',
    'B2B dashboard',
    'Catania',
    'Sicily',
  ],
} as const;

export const sameAs = Object.values(SITE.social).filter(Boolean);
