'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Job } from '@/types/contentful';

gsap.registerPlugin(ScrollTrigger);

export default function Curriculum({ jobs }: { jobs: Job[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(
                card,
                {
                    opacity: 0.2,
                    scale: 0.9,
                    filter: 'blur(5px)',
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: true,
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        });
    }, [jobs]);

    return (
        <section className="py-20 bg-zinc-950 text-white min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Curriculum</h2>
                <div ref={containerRef} className="space-y-12 max-w-3xl mx-auto">
                    {jobs.map((job, index) => (
                        <div
                            key={job.sys.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm transition-colors hover:border-zinc-600"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-semibold text-blue-400">{job.fields.companyName}</h3>
                                <span className="text-zinc-400 font-mono text-sm">{job.fields.period}</span>
                            </div>
                            <ul className="space-y-2">
                                {job.fields.description.map((desc, i) => (
                                    <li key={i} className="text-zinc-300 leading-relaxed flex items-start">
                                        <span className="mr-2 text-blue-500">▹</span>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
