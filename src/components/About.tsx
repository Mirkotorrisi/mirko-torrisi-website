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
      <p className="mb-6 text-xl leading-[1.7] last:mb-0">{children}</p>
    ),
  },
};

export default function About({ section }: { section: Section }) {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-limestone px-5 pb-24 text-lava md:px-8 md:pb-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-lava/25 pt-24 md:pt-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="h-section">{section.fields.title}</h2>
          <div className="mt-10 max-w-[38rem]">
            {documentToReactComponents(section.fields.paragraph, options)}
          </div>
        </div>
        <div className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-sm bg-limestone-deep lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <Image
            src="/foto-cv.webp"
            alt="Mirko Torrisi"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
