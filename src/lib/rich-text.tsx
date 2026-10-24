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
      <p className="mb-5 leading-relaxed text-zinc-300">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children: ReactNode) => (
      <h2 className="mt-14 mb-4 text-2xl font-bold text-white">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children: ReactNode) => (
      <h3 className="mt-8 mb-3 text-lg font-semibold text-white">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children: ReactNode) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-zinc-300 marker:text-blue-400">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children: ReactNode) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-zinc-300 marker:text-blue-400">
        {children}
      </ol>
    ),
    // Contentful wraps list items in paragraphs: drop the paragraph margin there.
    [BLOCKS.LIST_ITEM]: (_node, children: ReactNode) => (
      <li className="leading-relaxed [&>p]:mb-0">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => (
      <blockquote className="mb-6 border-l-2 border-blue-500 pl-4 text-zinc-400 italic">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-10 border-zinc-800" />,
    [INLINES.HYPERLINK]: (node, children: ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline underline-offset-4 hover:text-blue-300"
      >
        {children}
      </a>
    ),
  },
};
