import { Work } from '@/types/contentful';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// The slug field is optional in Contentful: fall back to the title so a work
// without one still gets a stable URL.
export const workSlug = (work: Work) =>
  work.fields.slug || slugify(work.fields.title);

// Asset URLs from Contentful are protocol-relative ("//images.ctfassets.net/...").
export const assetUrl = (url?: string) =>
  url ? (url.startsWith('//') ? `https:${url}` : url) : undefined;
