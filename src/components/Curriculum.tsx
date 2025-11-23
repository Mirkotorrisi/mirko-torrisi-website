'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Job } from '@/types/contentful';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

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

  const options: Options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="space-y-2">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="flex items-start leading-relaxed text-zinc-300">
          <span className="mt-1.5 mr-2 text-blue-500">▹</span>
          <div className="flex-1">{children}</div>
        </li>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-2 leading-relaxed text-zinc-300 last:mb-0">
          {children}
        </p>
      ),
    },
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
          Curriculum
        </h2>
        <div ref={containerRef} className="mx-auto max-w-3xl space-y-12">
          {jobs.map((job, index) => (
            <div
              key={job.sys.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-colors hover:border-zinc-600"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-blue-400">
                  {job.fields.companyName}
                </h3>
                <span className="font-mono text-sm text-zinc-400">
                  {job.fields.period}
                </span>
              </div>
              <div className="text-zinc-300">
                {documentToReactComponents(job.fields.description, options)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
