import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import { getWorkBySlug, getWorks } from '@/lib/contentful';
import { articleOptions, hasContent, richTextToPlain } from '@/lib/rich-text';
import { SITE } from '@/lib/site';
import { assetUrl, workSlug } from '@/lib/work-slug';
import {
  htmlLang,
  isLocale,
  languageAlternates,
  localePath,
  locales,
  ogLocale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const works = await getWorks();
  return locales.flatMap((lang) =>
    works.map((work) => ({ lang, slug: workSlug(work) }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const work = await getWorkBySlug(slug, lang);
  if (!work) return {};

  const { title, tagline, description, image } = work.fields;
  const summary = tagline || richTextToPlain(description).slice(0, 200);
  const cover = assetUrl(image?.fields?.file?.url);
  const path = `/works/${slug}`;

  return {
    title,
    description: summary,
    alternates: {
      canonical: localePath(lang, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'article',
      url: `${SITE.url}${localePath(lang, path)}`,
      title,
      description: summary,
      locale: ogLocale[lang],
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: summary },
  };
}

export default async function WorkPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const works = await getWorks(lang);
  const index = works.findIndex((w) => workSlug(w) === slug);
  if (index === -1) notFound();

  const work = works[index];
  const nextWork = works.length > 1 ? works[(index + 1) % works.length] : null;
  const other = locales.find((l) => l !== lang)!;
  const path = `/works/${slug}`;

  const {
    title,
    tagline,
    link,
    repoUrl,
    category,
    role,
    period,
    stack,
    description,
    caseStudy,
    hindsight,
    image,
  } = work.fields;
  const cover = assetUrl(image?.fields?.file?.url);
  const meta = [category && dict.works.categories[category], role, period].filter(
    Boolean
  ) as string[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: title,
        description: tagline || richTextToPlain(description).slice(0, 200),
        url: `${SITE.url}${localePath(lang, path)}`,
        inLanguage: htmlLang[lang],
        author: { '@id': `${SITE.url}/#person` },
        ...(cover ? { image: cover } : {}),
        ...(stack?.length ? { keywords: stack.join(', ') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE.name,
            item: `${SITE.url}${localePath(lang)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: dict.works.heading,
            item: `${SITE.url}${localePath(lang)}#works`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: `${SITE.url}${localePath(lang, path)}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Header
        lang={lang}
        dict={dict.nav}
        alternateHref={localePath(other, path)}
      />
      <main className="min-h-screen bg-zinc-950 pt-16 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href={`${localePath(lang)}#works`}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> {dict.works.back}
          </Link>

          <header className="mt-10">
            {meta.length > 0 && (
              <p className="text-sm tracking-wide text-blue-400 uppercase">
                {meta.join(' · ')}
              </p>
            )}
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
            {tagline && <p className="mt-4 text-xl text-zinc-400">{tagline}</p>}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
              >
                {dict.works.visit} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-zinc-500"
                >
                  {dict.works.source}{' '}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          </header>

          {cover && (
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800">
              <Image
                src={cover}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {stack && stack.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12">
            {hasContent(caseStudy)
              ? documentToReactComponents(caseStudy!, articleOptions)
              : documentToReactComponents(description, articleOptions)}
          </div>

          {hasContent(hindsight) && (
            <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
              <h2 className="mb-4 text-xl font-bold text-white">
                {dict.works.hindsight}
              </h2>
              {documentToReactComponents(hindsight!, articleOptions)}
            </section>
          )}

          <section className="mt-16 rounded-2xl border border-blue-500/30 bg-linear-to-br from-blue-600/20 to-zinc-900 p-8 text-center md:p-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {dict.works.ctaHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-300">
              {dict.works.ctaBody}
            </p>
            <Link
              href={`${localePath(lang)}#contact`}
              className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              {dict.works.ctaButton}
            </Link>
          </section>

          {nextWork && (
            <Link
              href={localePath(lang, `/works/${workSlug(nextWork)}`)}
              className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 p-6 transition-colors hover:border-zinc-600"
            >
              <span>
                <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  {dict.works.next}
                </span>
                <span className="mt-1 block text-lg font-semibold text-white">
                  {nextWork.fields.title}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          )}
        </article>
      </main>
    </>
  );
}
