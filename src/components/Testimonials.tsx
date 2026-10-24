import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/contentful';

// Renders nothing until at least one testimonial is published in Contentful.
export default function Testimonials({
  heading,
  testimonials,
}: {
  heading: string;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-zinc-950 px-4 py-24 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
          {heading}
        </h2>
        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.sys.id}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
            >
              <Quote className="h-6 w-6 text-blue-400" aria-hidden />
              <blockquote className="mt-4 flex-1 leading-relaxed text-zinc-200">
                {t.fields.quote}
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-white">
                {t.fields.author}
              </p>
              {t.fields.role && (
                <p className="text-sm text-zinc-500">{t.fields.role}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
