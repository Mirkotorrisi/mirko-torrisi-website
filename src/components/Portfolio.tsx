'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Work } from '@/types/contentful';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({ works }: { works: Work[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Work | null>(null);

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

          {works.map((work) => (
            <div
              key={work.sys.id}
              className="group relative h-[450px] w-[350px] shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 flex items-center justify-center p-16 transition-transform duration-700 group-hover:scale-110">
                <img
                  src={work.fields.image.fields.file.url}
                  alt={work.fields.title}
                  className="h-full w-full object-contain drop-shadow-2xl filter transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/40 to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {work.fields.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(work)}
                  className="w-full rounded-xl bg-white py-3 text-sm font-bold text-black transition-transform hover:scale-105 hover:cursor-pointer active:scale-95"
                >
                  View Project
                </button>
              </div>
            </div>
          ))}

          {/* Spacer for end of scroll */}
          <div className="w-[20vw]" />
        </div>
      </section>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        work={selectedProject}
      />
    </>
  );
}
