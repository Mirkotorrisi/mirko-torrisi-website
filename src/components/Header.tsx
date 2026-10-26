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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lava/15 bg-limestone/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href={home}
          className="font-display text-lg font-bold tracking-tight text-lava"
        >
          Mirko Torrisi
        </Link>

        <ul className="hidden items-center gap-8 font-display text-[0.95rem] font-medium text-basalt md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-majolica">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="font-display text-sm font-medium text-basalt underline-offset-4 transition-colors hover:text-majolica hover:underline"
          >
            {dict.switchTo}
          </Link>
          <a
            href={`${home}#contact`}
            className="rounded-sm bg-lava px-4 py-2 font-display text-sm font-semibold text-limestone transition-colors hover:bg-majolica"
          >
            {dict.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
