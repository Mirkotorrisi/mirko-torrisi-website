import Link from 'next/link';
import type { Work } from '@/types/contentful';
import type { Dictionary } from '@/i18n/dictionaries';
import { Locale, localePath } from '@/i18n/config';
import { workSlug } from '@/lib/work-slug';

type Props = {
  lang: Locale;
  dict: Dictionary['services'];
  works: Work[];
};

export default function Services({ lang, dict, works }: Props) {
  const bySlug = new Map(works.map((w) => [workSlug(w), w]));

  return (
    <section
      id="services"
      className="on-lava scroll-mt-16 bg-lava px-5 py-24 text-limestone md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="h-section lg:col-span-5">{dict.heading}</h2>
          <p className="max-w-[34rem] text-xl text-ash lg:col-span-6 lg:col-start-7 lg:pt-3">
            {dict.intro}
          </p>
        </div>

        <div className="mt-16 border-t border-limestone/25">
          {dict.items.map((service, i) => {
            const examples = service.examples
              .map((slug) => bySlug.get(slug))
              .filter((w): w is Work => Boolean(w));

            return (
              <details
                key={service.id}
                name="services"
                open={i === 0}
                className="group border-b border-limestone/25"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 transition-colors hover:text-majolica-light md:py-9 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                    {service.title}
                  </h3>
                  <span aria-hidden className="relative h-6 w-6 shrink-0">
                    <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
                  </span>
                </summary>

                <div className="grid gap-8 pb-12 lg:grid-cols-12">
                  <p className="max-w-[34rem] text-xl lg:col-span-5">
                    {service.body}
                  </p>
                  <div className="lg:col-span-6 lg:col-start-7">
                    <ul className="space-y-3 text-ash">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="border-l-2 border-majolica-light pl-4"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    {examples.length > 0 && (
                      <div className="mt-8">
                        <p className="text-ash">{dict.examplesLabel}</p>
                        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                          {examples.map((work) => (
                            <li key={work.sys.id}>
                              <Link
                                href={localePath(lang, `/works/${workSlug(work)}`)}
                                className="font-display font-semibold underline decoration-majolica-light decoration-2 underline-offset-4 transition-colors hover:text-majolica-light"
                              >
                                {work.fields.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
