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
            <section ref={triggerRef} className="overflow-hidden bg-white text-black">
                <div
                    ref={sectionRef}
                    className="flex h-screen w-fit items-center px-12 gap-12"
                >
                    <div className="flex-shrink-0 w-[400px] pr-12">
                        <h2 className="text-6xl font-bold leading-tight">
                            Selected<br />Works
                        </h2>
                        <p className="mt-4 text-xl text-gray-600">
                            A collection of my recent projects and experiments.
                        </p>
                    </div>

                    {works.map((work) => (
                        <div
                            key={work.sys.id}
                            className="flex-shrink-0 w-[600px] h-[70vh] relative group overflow-hidden rounded-3xl bg-gray-100"
                        >
                            {/* Image Placeholder - In real app use work.fields.image.fields.file.url */}
                            <div className="absolute inset-0 bg-gray-300 transition-transform duration-700 group-hover:scale-105">
                                {/* Using a placeholder image if the URL is mock or invalid, otherwise use Next Image */}
                                <img
                                    src={work.fields.image.fields.file.url}
                                    alt={work.fields.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">{work.fields.title}</h3>
                                <button
                                    onClick={() => setSelectedProject(work)}
                                    className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-colors w-fit cursor-pointer"
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
