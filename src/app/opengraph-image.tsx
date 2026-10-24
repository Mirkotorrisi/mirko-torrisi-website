import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          background: 'linear-gradient(135deg, #000000 0%, #09090b 55%, #1e3a8a 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em' }}>
          MIRKO TORRISI
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            letterSpacing: '0.2em',
            color: '#93c5fd',
          }}
        >
          FULL STACK DEVELOPER
        </div>
        <div style={{ marginTop: 48, fontSize: 30, color: '#a1a1aa' }}>
          React · Next.js · TypeScript · NestJS — Catania / Remote
        </div>
      </div>
    ),
    size
  );
}
