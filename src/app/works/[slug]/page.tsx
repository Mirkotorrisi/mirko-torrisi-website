import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getWorkBySlug, getWorks } from '@/lib/contentful';
import { articleOptions, hasContent, richTextToPlain } from '@/lib/rich-text';
import { SITE } from '@/lib/site';
import { assetUrl, workSlug } from '@/lib/work-slug';
import { WorkCategory } from '@/types/contentful';

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABEL: Record<WorkCategory, string> = {
  agentic: 'Agentic AI',
  client: 'Client work',
  personal: 'Personal project',
};

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ slug: workSlug(work) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};

  const { title, tagline, description, image } = work.fields;
  const summary = tagline || richTextToPlain(description).slice(0, 200);
  const cover = assetUrl(image?.fields?.file?.url);

  return {
    title,
    description: summary,
    alternates: { canonical: `/works/${slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE.url}/works/${slug}`,
      title,
      description: summary,
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description: summary },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

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
  const meta = [
    category && CATEGORY_LABEL[category],
    role,
    period,
  ].filter(Boolean) as string[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: tagline || richTextToPlain(description).slice(0, 200),
    url: `${SITE.url}/works/${slug}`,
    author: { '@id': `${SITE.url}/#person` },
    ...(cover ? { image: cover } : {}),
    ...(stack?.length ? { keywords: stack.join(', ') } : {}),
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <header className="mt-10">
          {meta.length > 0 && (
            <p className="text-sm tracking-wide text-blue-400 uppercase">
              {meta.join(' · ')}
            </p>
          )}
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
          {tagline && (
            <p className="mt-4 text-xl text-zinc-400">{tagline}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Visit project <ArrowUpRight className="h-4 w-4" />
            </a>
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-zinc-500"
              >
                Source code <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            className="mt-12 aspect-video w-full rounded-2xl border border-zinc-800 object-cover"
          />
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
              What I would do differently today
            </h2>
            {documentToReactComponents(hindsight!, articleOptions)}
          </section>
        )}
      </article>
    </main>
  );
}
