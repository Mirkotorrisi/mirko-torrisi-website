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
              className="group relative h-[70vh] w-[600px] shrink-0 overflow-hidden rounded-3xl bg-gray-100"
            >
              {/* Image Placeholder - In real app use work.fields.image.fields.file.url */}
              <div className="absolute inset-0 bg-gray-300 transition-transform duration-700 group-hover:scale-105">
                {/* Using a placeholder image if the URL is mock or invalid, otherwise use Next Image */}
                <img
                  src={work.fields.image.fields.file.url}
                  alt={work.fields.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="mb-2 text-3xl font-bold">{work.fields.title}</h3>
                <button
                  onClick={() => setSelectedProject(work)}
                  className="inline-block w-fit cursor-pointer rounded-full bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-blue-500 hover:text-white"
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
