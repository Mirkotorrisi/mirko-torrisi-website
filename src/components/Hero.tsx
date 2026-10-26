import Ashlar from './Ashlar';
import type { Dictionary } from '@/i18n/dictionaries';

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section className="bg-limestone pt-16 text-lava">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 text-basalt">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full bg-lemon ring-1 ring-lava/40"
            />
            {dict.badge}
          </p>

          <h1 className="mt-8 font-display text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[1] font-bold tracking-[-0.035em] text-balance">
            {dict.headline}
          </h1>

          <p className="mt-8 font-display text-xl font-semibold">
            Mirko Torrisi
            <span className="font-normal text-basalt">, {dict.role}</span>
          </p>
          <p className="mt-2 max-w-[34rem] text-basalt">{dict.sub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#contact"
              className="rounded-sm bg-majolica px-7 py-3.5 font-display font-semibold text-white transition-colors hover:bg-lava"
            >
              {dict.ctaPrimary}
            </a>
            <a
              href="#works"
              className="font-display font-semibold underline decoration-majolica decoration-2 underline-offset-[6px] transition-colors hover:text-majolica"
            >
              {dict.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="aspect-5/4 w-full lg:col-span-5 lg:aspect-4/5">
          <Ashlar />
        </div>
      </div>
    </section>
  );
}
