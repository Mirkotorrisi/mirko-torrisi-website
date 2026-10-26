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
      className="scroll-mt-16 bg-limestone px-5 py-24 text-lava md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="h-section lg:col-span-5">{dict.heading}</h2>
          <p className="max-w-[34rem] text-xl text-basalt lg:col-span-6 lg:col-start-7 lg:pt-3">
            {dict.intro}
          </p>
        </div>

        <ul className="mt-16 border-t border-lava/25">
          {works.map((work) => {
            const image = assetUrl(work.fields.image?.fields?.file?.url);
            const category = work.fields.category;
            const stack = work.fields.stack?.slice(0, 4).join(', ');

            return (
              <li key={work.sys.id} className="border-b border-lava/25">
                {/* The whole row is the link, so it works on touch screens too. */}
                <Link
                  href={localePath(lang, `/works/${workSlug(work)}`)}
                  className="group grid gap-5 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
                >
                  <div className="relative order-first aspect-16/10 overflow-hidden rounded-sm bg-limestone-deep md:order-last md:col-span-3">
                    {image && (
                      <Image
                        src={image}
                        alt={work.fields.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="stone-photo object-cover"
                      />
                    )}
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-majolica md:text-4xl">
                      {work.fields.title}
                    </h3>
                    {category && (
                      <p className="mt-2 text-basalt">{dict.categories[category]}</p>
                    )}
                  </div>

                  <div className="md:col-span-5">
                    {work.fields.tagline && (
                      <p className="text-lg">{work.fields.tagline}</p>
                    )}
                    {stack && <p className="mt-2 text-basalt">{stack}</p>}
                    <span className="mt-4 inline-flex items-center gap-1 font-display font-semibold text-majolica underline decoration-2 underline-offset-4">
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
