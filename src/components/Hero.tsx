'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Cubes from './Cubes';
import type { Dictionary } from '@/i18n/dictionaries';

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;

    if (!container || !circle) return;

    // Disable interactive features on mobile
    if (isMobile) return;

    const moveCircle = (e: MouseEvent) => {
      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Parallax effect on text
      if (textRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to(textRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', moveCircle);

    return () => {
      window.removeEventListener('mousemove', moveCircle);
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black pt-16 text-white"
    >
      <div className="absolute top-0 left-0 h-full w-full">
        <Cubes
          gridSize={isMobile ? 4 : 8}
          maxAngle={60}
          radius={4}
          faceColor="#00011199"
          rippleColor="#ff6b6b99"
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={!isMobile}
        />
      </div>
      {!isMobile && (
        <div
          ref={circleRef}
          className="pointer-events-none absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-50 mix-blend-screen blur-[100px]"
        />
      )}
      <div className="relative z-10 flex max-w-4xl flex-col items-center p-4 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {dict.badge}
        </span>
        <h1
          ref={textRef}
          className="text-6xl font-bold tracking-tighter mix-blend-difference md:text-9xl"
        >
          MIRKO TORRISI
        </h1>
        <p className="mt-4 text-lg font-light tracking-widest uppercase opacity-80 md:text-2xl">
          {dict.role}
        </p>
        <p className="mt-8 max-w-2xl text-xl leading-snug font-medium text-zinc-100 md:text-3xl">
          {dict.headline}
        </p>
        <p className="mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          {dict.sub}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            {dict.ctaPrimary}
          </a>
          <a
            href="#works"
            className="rounded-full border border-zinc-600 bg-black/30 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-zinc-400"
          >
            {dict.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
