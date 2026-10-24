export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];

// Served at "/" (redirect in next.config.ts) and used as hreflang x-default.
export const defaultLocale: Locale = 'it';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const htmlLang: Record<Locale, string> = { it: 'it', en: 'en' };
export const ogLocale: Record<Locale, string> = { it: 'it_IT', en: 'en_US' };

// Path for a page in a given locale, e.g. localePath('en', '/works/x') -> '/en/works/x'.
export const localePath = (locale: Locale, path = '') =>
  `/${locale}${path === '/' ? '' : path}`;

// hreflang map for Next.js metadata `alternates.languages`.
export const languageAlternates = (path = '') => ({
  ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
  'x-default': localePath(defaultLocale, path),
});
