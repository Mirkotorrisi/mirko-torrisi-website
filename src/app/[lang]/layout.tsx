import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Newsreader } from 'next/font/google';
import '../globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { SITE } from '@/lib/site';
import {
  htmlLang,
  isLocale,
  languageAlternates,
  localePath,
  locales,
  ogLocale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: meta.title,
      template: `%s | ${SITE.name}`,
    },
    description: meta.description,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    alternates: {
      canonical: localePath(lang),
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      url: `${SITE.url}${localePath(lang)}`,
      siteName: SITE.name,
      title: meta.title,
      description: meta.description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#e3e4df',
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]}>
      <body className={`${bricolage.variable} ${newsreader.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
