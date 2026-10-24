import Link from 'next/link';
import { Bot, Check, LayoutDashboard, MonitorSmartphone } from 'lucide-react';
import type { Work } from '@/types/contentful';
import type { Dictionary } from '@/i18n/dictionaries';
import { Locale, localePath } from '@/i18n/config';
import { workSlug } from '@/lib/work-slug';

const ICONS: Record<string, typeof Bot> = {
  websites: MonitorSmartphone,
  platforms: LayoutDashboard,
  ai: Bot,
};

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
      className="scroll-mt-20 bg-zinc-950 px-4 py-24 text-white md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold tracking-widest text-blue-400 uppercase">
          {dict.eyebrow}
        </p>
        <h2 className="mt-3 bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
          {dict.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-zinc-400">
          {dict.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dict.items.map((service) => {
            const Icon = ICONS[service.id] ?? Bot;
            const examples = service.examples
              .map((slug) => bySlug.get(slug))
              .filter((w): w is Work => Boolean(w));

            return (
              <article
                key={service.id}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-600"
              >
                <Icon className="h-8 w-8 text-blue-400" aria-hidden />
                <h3 className="mt-6 text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">
                  {service.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-zinc-300">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                {examples.length > 0 && (
                  <div className="mt-auto pt-8">
                    <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      {dict.examplesLabel}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {examples.map((work) => (
                        <li key={work.sys.id}>
                          <Link
                            href={localePath(lang, `/works/${workSlug(work)}`)}
                            className="inline-block rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-blue-500 hover:text-white"
                          >
                            {work.fields.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
