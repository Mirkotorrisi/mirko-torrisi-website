'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Work } from '@/types/contentful';
import { assetUrl, workSlug } from '@/lib/work-slug';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({ works }: { works: Work[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    // Calculate the total width of the horizontal scroll
    // We want to scroll the width of the section minus the viewport width
    const getScrollAmount = () => -(section.scrollWidth - window.innerWidth);

    const tween = gsap.to(section, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${section.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [works]);

  return (
    <>
      <section
        ref={triggerRef}
        className="overflow-hidden bg-zinc-950 text-white"
      >
        <div
          ref={sectionRef}
          className="flex h-screen w-fit items-center gap-12 px-12"
        >
          <div className="w-[400px] shrink-0 pr-12">
            <h2 className="text-6xl leading-tight font-bold">
              Selected
              <br />
              Works
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              A collection of my recent projects and experiments.
            </p>
          </div>

          {works.map((work) => {
            const image = assetUrl(work.fields.image?.fields?.file?.url);

            return (
              <div
                key={work.sys.id}
                style={
                  { '--card-image': `url("${image}")` } as React.CSSProperties
                }
                className="group relative isolate h-[450px] w-[350px] shrink-0 before:absolute before:inset-3 before:-z-10 before:rounded-2xl before:bg-(image:--card-image) before:bg-cover before:bg-center before:opacity-50 before:blur-2xl before:saturate-200 before:transition-all before:duration-500 before:content-[''] hover:before:inset-0 hover:before:opacity-80"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                  <img
                    src={image}
                    alt={work.fields.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/40 to-transparent p-8 transition-colors duration-300 group-hover:from-black/95 group-hover:via-black/60">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      {work.fields.title}
                    </h3>
                    {work.fields.tagline && (
                      <p className="mb-4 text-sm text-zinc-300">
                        {work.fields.tagline}
                      </p>
                    )}
                    <Link
                      href={`/works/${workSlug(work)}`}
                      className="block w-full translate-y-2 rounded-xl bg-white py-3 text-center text-sm font-bold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Spacer for end of scroll */}
          <div className="w-[20vw]" />
        </div>
      </section>
    </>
  );
}
