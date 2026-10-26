import type { ReactNode } from 'react';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';

// Plain text of a rich text document, for meta descriptions.
export const richTextToPlain = (node: unknown): string => {
  if (!node || typeof node !== 'object') return '';
  const n = node as { value?: string; content?: unknown[] };
  if (typeof n.value === 'string') return n.value;
  return (n.content ?? []).map(richTextToPlain).join(' ').replace(/\s+/g, ' ').trim();
};

export const hasContent = (doc?: Document) => richTextToPlain(doc).length > 0;

export const articleOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children: ReactNode) => (
      <p className="mb-5 leading-[1.7] text-lava">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children: ReactNode) => (
      <h2 className="mt-14 mb-4 font-display text-3xl font-bold tracking-tight text-lava">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children: ReactNode) => (
      <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-lava">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children: ReactNode) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lava marker:text-majolica">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children: ReactNode) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lava marker:text-majolica">
        {children}
      </ol>
    ),
    // Contentful wraps list items in paragraphs: drop the paragraph margin there.
    [BLOCKS.LIST_ITEM]: (_node, children: ReactNode) => (
      <li className="leading-relaxed [&>p]:mb-0">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => (
      <blockquote className="mb-6 border-l-2 border-majolica pl-4 text-basalt italic">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-lava/25" />,
    [INLINES.HYPERLINK]: (node, children: ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-majolica underline underline-offset-4 hover:text-lava"
      >
        {children}
      </a>
    ),
  },
};
