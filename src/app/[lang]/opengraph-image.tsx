import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export const alt = `${SITE.name} – ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const hero = getDictionary(isLocale(lang) ? lang : 'en').hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            '#17191b',
          color: '#e3e4df',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em' }}>
          Mirko Torrisi
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            color: '#8fa8ff',
          }}
        >
          {hero.role}
        </div>
        <div
          style={{ marginTop: 48, fontSize: 34, color: '#e3e4df', maxWidth: 1000 }}
        >
          {hero.headline}
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: '#a9adaa' }}>
          Catania · Remote · mirkotorrisi.it
        </div>
      </div>
    ),
    size
  );
}
