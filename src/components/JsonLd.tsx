import { SITE, sameAs } from '@/lib/site';

// Structured data so Google understands who this site is about and what is offered.
export default function JsonLd() {
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
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#service`,
        name: `${SITE.name} – ${SITE.jobTitle}`,
        description: SITE.description,
        url: SITE.url,
        image: `${SITE.url}/opengraph-image`,
        founder: { '@id': `${SITE.url}/#person` },
        areaServed: ['IT', 'Europe'],
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
        inLanguage: 'en',
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
