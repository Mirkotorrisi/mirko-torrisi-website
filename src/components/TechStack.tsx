'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiGraphql,
  SiLangchain,
  SiOpenai,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGooglecloud,
  SiGit,
  SiJira,
  SiShadcnui,
} from 'react-icons/si';
import { ServerCog, BrainCircuit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: 'Frontend Ecosystem',
    techs: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Shadcn/UI', icon: SiShadcnui, color: '#FFFFFF' },
      { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    title: 'Backend & Architecture',
    techs: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
      { name: 'Python (Flask)', icon: SiPython, color: '#3776AB' },
      { name: 'Microservices', icon: ServerCog, color: '#FF9900' }, // Custom color
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    title: 'AI & Emerging Tech',
    techs: [
      { name: 'LangChain', icon: SiLangchain, color: '#1C3C3C' }, // Dark green/black
      { name: 'OpenAI API', icon: SiOpenai, color: '#412991' },
      { name: 'RAG', icon: BrainCircuit, color: '#FFD700' }, // Gold
    ],
  },
  {
    title: 'Database & DevOps',
    techs: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
    ],
  },
  {
    title: 'Workflow & Tools',
    techs: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Jira', icon: SiJira, color: '#0052CC' },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoriesRef.current.forEach((category, index) => {
        if (!category) return;

        gsap.fromTo(
          category,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: category,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-zinc-950 px-4 py-24 md:px-8 lg:px-16"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-900/20 blur-[128px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-900/20 blur-[128px]" />

      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {techCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                categoriesRef.current[index] = el;
              }}
              className="flex flex-col gap-6"
            >
              <h3 className="border-b border-zinc-800 pb-2 text-2xl font-semibold text-zinc-200">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex cursor-default items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  >
                    <tech.icon
                      className="text-xl transition-colors duration-300 group-hover:text-white"
                      style={{ color: tech.color }}
                    />
                    <span className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
