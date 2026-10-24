import Link from 'next/link';
import { Locale, localePath, locales } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

type Props = {
  lang: Locale;
  dict: Dictionary['nav'];
  // Same page in the other language; defaults to the other language's home.
  alternateHref?: string;
};

export default function Header({ lang, dict, alternateHref }: Props) {
  const home = localePath(lang);
  const other = locales.find((l) => l !== lang)!;
  const switchHref = alternateHref ?? localePath(other);

  const links = [
    { href: `${home}#services`, label: dict.services },
    { href: `${home}#works`, label: dict.works },
    { href: `${home}#about`, label: dict.about },
    { href: `${home}#contact`, label: dict.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href={home}
          className="text-sm font-bold tracking-widest text-white uppercase"
        >
          Mirko Torrisi
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            {dict.switchTo}
          </Link>
          <a
            href={`${home}#contact`}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            {dict.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
