import type { MetadataRoute } from 'next';
import { getWorks } from '@/lib/contentful';
import { SITE } from '@/lib/site';
import { workSlug } from '@/lib/work-slug';
import { languageAlternates, localePath, locales } from '@/i18n/config';

const absolute = (path: string) => `${SITE.url}${path}`;

// One entry per language, each listing its translations (hreflang).
const localized = (
  path: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>
): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([l, p]) => [l, absolute(p)])
  );
  return locales.map((lang) => ({
    url: absolute(localePath(lang, path)),
    alternates: { languages },
    ...extra,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();

  // The home page changes whenever a project does.
  const latest = works
    .map((w) => w.sys.updatedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop();

  return [
    ...localized('', {
      ...(latest ? { lastModified: new Date(latest) } : {}),
      changeFrequency: 'monthly',
      priority: 1,
    }),
    ...works.flatMap((work) =>
      localized(`/works/${workSlug(work)}`, {
        ...(work.sys.updatedAt
          ? { lastModified: new Date(work.sys.updatedAt) }
          : {}),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    ),
  ];
}
