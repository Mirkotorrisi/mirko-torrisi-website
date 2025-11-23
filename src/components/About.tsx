'use client';

import { Section } from '@/types/contentful';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-6 text-lg leading-relaxed text-zinc-300 last:mb-0">
        {children}
      </p>
    ),
  },
};

export default function About({ section }: { section: Section }) {
  return (
    <section className="bg-zinc-950 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-left">
            <h2 className="mb-8 bg-linear-to-r from-blue-400 to-white bg-clip-text text-center text-5xl font-bold text-transparent md:text-6xl">
              {section.fields.title}
            </h2>
            <div className="text-zinc-300">
              {documentToReactComponents(section.fields.paragraph, options)}
            </div>
          </div>
          <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl mask-[linear-gradient(to_bottom,black_70%,transparent_100%)] md:ml-auto">
            <Image
              src="/foto-cv.webp"
              alt="Mirko Torrisi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
