import type { Dictionary } from '@/i18n/dictionaries';

const techCategories = [
  {
    title: 'Frontend Ecosystem',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Redux Toolkit'],
  },
  {
    title: 'Backend & Architecture',
    techs: ['Node.js', 'NestJS', 'Python (Flask)', 'Microservices', 'GraphQL'],
  },
  {
    title: 'AI & Emerging Tech',
    techs: ['LangChain', 'OpenAI API', 'RAG', 'Claude Code & MCP'],
  },
  {
    title: 'Database & DevOps',
    techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'GCP'],
  },
  {
    title: 'Workflow & Tools',
    techs: ['Git', 'Jira'],
  },
];

export default function TechStack({
  dict,
}: {
  dict: Dictionary['techStack'];
}) {
  return (
    <section className="on-lava bg-lava px-5 py-24 text-limestone md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="h-section">{dict.heading}</h2>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, index) => (
            <div key={category.title} className="border-t border-limestone/25 pt-5">
              <h3 className="font-display text-xl font-semibold">
                {dict.categories[index] ?? category.title}
              </h3>
              <ul className="mt-4 space-y-1.5 text-ash">
                {category.techs.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
