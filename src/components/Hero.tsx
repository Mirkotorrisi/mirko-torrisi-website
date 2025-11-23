'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Cubes from './Cubes';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;

    if (!container || !circle) return;

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
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute top-0 left-0 h-full w-full">
        <Cubes
          gridSize={8}
          maxAngle={60}
          radius={4}
          faceColor="#00011199"
          rippleColor="#ff6b6b99"
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>
      <div
        ref={circleRef}
        className="pointer-events-none absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-50 mix-blend-screen blur-[100px]"
      />
      <div className="z-10 p-4 text-center">
        <h1
          ref={textRef}
          className="text-6xl font-bold tracking-tighter mix-blend-difference md:text-9xl"
        >
          MIRKO TORRISI
        </h1>
        <p className="mt-4 text-xl font-light tracking-widest uppercase opacity-80 md:text-2xl">
          FULL STACK DEVELOPER
        </p>
      </div>
    </section>
  );
}
