'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
            className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center"
        >
            <div
                ref={circleRef}
                className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            />

            <div className="z-10 text-center p-4">
                <h1 ref={textRef} className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-difference">
                    MIRKO TORRISI
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-light tracking-widest uppercase opacity-80">
                    Creative Developer
                </p>
            </div>
        </section>
    );
}
