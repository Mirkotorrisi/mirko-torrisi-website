// Single source of truth for site-wide SEO and identity data.
// Update here; metadata, sitemap, robots, JSON-LD and contact links all read from it.

export const SITE = {
  url: 'https://mirkotorrisi.it',
  name: 'Mirko Torrisi',
  jobTitle: 'Full Stack Developer',
  // Page titles and descriptions are per language: see src/i18n/dictionaries.ts.
  description:
    'Freelance full stack developer in Catania, Sicily: websites for businesses, B2B web platforms and AI agents.',
  locale: 'en_US',
  city: 'Catania',
  region: 'Sicily',
  country: 'IT',
  // Direct contact shown next to the form. Left empty on purpose until Mirko
  // decides which address / number to publish: empty values are hidden.
  email: '' as string,
  whatsapp: '' as string, // international format without "+" or spaces, e.g. 393331234567
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
    'AI agents',
    'Sviluppatore web Catania',
    'Realizzazione siti web Catania',
    'Catania',
    'Sicily',
  ],
} as const;

export const sameAs = Object.values(SITE.social).filter(Boolean);
