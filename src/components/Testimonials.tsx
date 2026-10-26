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
    <section className="on-lava bg-lava px-5 py-24 text-limestone md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="h-section">{heading}</h2>
        <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.sys.id} className="border-t border-limestone/25 pt-6">
              <blockquote className="text-2xl leading-snug italic">
                {t.fields.quote}
              </blockquote>
              <p className="mt-6 font-display font-semibold">{t.fields.author}</p>
              {t.fields.role && <p className="text-ash">{t.fields.role}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
