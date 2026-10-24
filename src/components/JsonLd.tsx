import { SITE, sameAs } from '@/lib/site';
import { Locale, localePath } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

// Structured data so Google understands who this site is about and what is offered.
export default function JsonLd({ lang }: { lang: Locale }) {
  const { meta, services } = getDictionary(lang);
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.name,
        jobTitle: SITE.jobTitle,
        url: SITE.url,
        image: `${SITE.url}/foto-cv.webp`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'NestJS',
          'Node.js',
          'Microservices',
          'MongoDB',
          'PostgreSQL',
          'Redis',
          'Docker',
          'AI agents',
          'Model Context Protocol (MCP)',
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#service`,
        name: `${SITE.name} – ${SITE.jobTitle}`,
        description: meta.description,
        url: `${SITE.url}${localePath(lang)}`,
        image: `${SITE.url}${localePath(lang)}/opengraph-image`,
        founder: { '@id': `${SITE.url}/#person` },
        areaServed: ['IT', 'Europe'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: services.heading,
          itemListElement: services.items.map((item) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: item.title,
              description: item.body,
            },
          })),
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: ['it', 'en'],
        publisher: { '@id': `${SITE.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
