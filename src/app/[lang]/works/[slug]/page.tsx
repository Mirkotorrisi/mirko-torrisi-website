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
      <main className="min-h-screen bg-limestone pt-16 text-lava">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href={`${localePath(lang)}#works`}
            className="inline-flex items-center gap-2 font-display font-medium text-basalt transition-colors hover:text-majolica"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> {dict.works.back}
          </Link>

          <header className="mt-10">
            {meta.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-basalt">
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <h1 className="mt-4 font-display text-5xl leading-none font-bold tracking-[-0.035em] text-balance md:text-7xl">
              {title}
            </h1>
            {tagline && (
              <p className="mt-6 max-w-[34rem] text-xl text-basalt">{tagline}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-majolica px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-lava"
              >
                {dict.works.visit} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border-2 border-lava px-6 py-3 font-display font-semibold transition-colors hover:bg-lava hover:text-limestone"
                >
                  {dict.works.source}{' '}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          </header>

          {cover && (
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-sm bg-limestone-deep">
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
                  className="rounded-sm bg-limestone-deep px-3 py-1 text-base"
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
            <section className="mt-14 border-l-4 border-majolica bg-limestone-deep p-6 md:p-8">
              <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">
                {dict.works.hindsight}
              </h2>
              {documentToReactComponents(hindsight!, articleOptions)}
            </section>
          )}

          <section className="on-lava mt-16 rounded-sm bg-lava p-8 text-limestone md:p-10">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {dict.works.ctaHeading}
            </h2>
            <p className="mt-3 max-w-md text-ash">
              {dict.works.ctaBody}
            </p>
            <Link
              href={`${localePath(lang)}#contact`}
              className="mt-6 inline-block rounded-sm bg-majolica px-8 py-3.5 font-display font-semibold text-white transition-colors hover:bg-limestone hover:text-lava"
            >
              {dict.works.ctaButton}
            </Link>
          </section>

          {nextWork && (
            <Link
              href={localePath(lang, `/works/${workSlug(nextWork)}`)}
              className="group mt-10 flex items-center justify-between gap-4 border-y border-lava/25 py-6 transition-colors hover:text-majolica"
            >
              <span>
                <span className="block text-basalt">
                  {dict.works.next}
                </span>
                <span className="mt-1 block font-display text-2xl font-semibold tracking-tight">
                  {nextWork.fields.title}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          )}
        </article>
      </main>
    </>
  );
}
