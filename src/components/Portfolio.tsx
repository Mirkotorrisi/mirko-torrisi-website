import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Work } from '@/types/contentful';
import type { Dictionary } from '@/i18n/dictionaries';
import { Locale, localePath } from '@/i18n/config';
import { assetUrl, workSlug } from '@/lib/work-slug';

type Props = {
  lang: Locale;
  dict: Dictionary['works'];
  works: Work[];
};

export default function Portfolio({ lang, dict, works }: Props) {
  return (
    <section
      id="works"
      className="scroll-mt-20 bg-zinc-950 px-4 py-24 text-white md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
          {dict.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-400">
          {dict.intro}
        </p>

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => {
            const image = assetUrl(work.fields.image?.fields?.file?.url);
            const category = work.fields.category;

            return (
              <li key={work.sys.id}>
                {/* The whole card is the link, so it works on touch screens too. */}
                <Link
                  href={localePath(lang, `/works/${workSlug(work)}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    {image && (
                      <Image
                        src={image}
                        alt={work.fields.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {category && (
                      <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-zinc-200 backdrop-blur-sm">
                        {dict.categories[category]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white">
                      {work.fields.title}
                    </h3>
                    {work.fields.tagline && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {work.fields.tagline}
                      </p>
                    )}
                    {work.fields.stack && work.fields.stack.length > 0 && (
                      <p className="mt-4 text-xs text-zinc-500">
                        {work.fields.stack.slice(0, 4).join(' · ')}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                      {dict.view}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
