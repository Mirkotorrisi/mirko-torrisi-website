import type { MetadataRoute } from 'next';
import { getWorks } from '@/lib/contentful';
import { SITE } from '@/lib/site';
import { workSlug } from '@/lib/work-slug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...works.map((work) => ({
      url: `${SITE.url}/works/${workSlug(work)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
