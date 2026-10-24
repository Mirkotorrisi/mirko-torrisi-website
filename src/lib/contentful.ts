import { createClient } from 'contentful';
import {
  PageData,
  Section,
  Job,
  Work,
  Contact,
  Testimonial,
  SectionSkeleton,
  JobSkeleton,
  WorkSkeleton,
  TestimonialSkeleton,
} from '@/types/contentful';
import type { Locale } from '@/i18n/config';
import { hasContent } from '@/lib/rich-text';
import { Document, BLOCKS } from '@contentful/rich-text-types';
import { SITE } from '@/lib/site';
import { workSlug } from '@/lib/work-slug';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client =
  SPACE_ID && ACCESS_TOKEN
    ? createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
      })
    : null;

// Helper to create simple paragraph rich text
const createRichText = (text: string): Document => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: text,
          marks: [],
          data: {},
        },
      ],
    },
  ],
});

const mockImage = {
  sys: { id: '1' },
  fields: {
    title: 'Mock Image',
    description: 'Mock Image Description',
    file: {
      url: 'https://placehold.co/600x400',
      details: { size: 1000, image: { width: 600, height: 400 } },
      fileName: 'mock.jpg',
      contentType: 'image/jpeg',
    },
  },
};

const mockData: PageData = {
  sections: [
    {
      sys: { id: 'hero' },
      fields: {
        title: 'Mirko Torrisi, developer',
        sectionId: 'hero',
        paragraph: createRichText(
          'Passionate about writing scalable, maintainable, and clean code, I approach every project with precision, adaptability, and a commitment to continuous learning.'
        ),
        image: mockImage,
      },
    },
    {
      sys: { id: 'about' },
      fields: {
        title: 'About me',
        sectionId: 'about',
        paragraph: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    "I am a Full Stack Developer based in Catania with a unique background. Before diving into code, I earned a degree in Economics—a foundation that shaped my approach to development: I don't just build software; I build efficient, cost-effective solutions that solve real business problems.",
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Since transitioning to tech in 2019 via the Steve Jobs Academy, I have accumulated 5 years of experience building high-traffic platforms for global sports brands (like the ICC and Atalanta B.C.) and complex enterprise dashboards. My core stack includes React, TypeScript, and NestJS, but I’m constantly exploring the bleeding edge—currently experimenting with AI Agents, RAG, and serverless architectures.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    "I love challenges that require both engineering rigor and creative thinking. Whether it's optimizing a massive database or hacking together a Telegram bot for a local chef, my goal is always the same: delivering value through code.",
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        image: mockImage,
      },
    },
  ],
  jobs: [
    {
      sys: { id: 'job1' },
      fields: {
        companyName: 'Deltatre',
        period: '2022 - today',
        description: createRichText(
          'Built multiple websites for different sporting leagues using Next.js, TailwindCSS, React, Storybook, and Styled Components for high-quality UI development.\nClients: ICC, Atalanta, Liv Golf'
        ),
      },
    },
    {
      sys: { id: 'job2' },
      fields: {
        companyName: 'Odds and More',
        period: '2021 - today',
        description: createRichText(
          'Built and maintained multiple web applications and microservices for a betting services platform.\nProficiently used Angular, NestJS, Python, MongoDB, Redis, RabbitMQ for scalable solutions.'
        ),
      },
    },
    {
      sys: { id: 'job3' },
      fields: {
        companyName: 'IT Partner Italia',
        period: '2021',
        description: createRichText(
          'Maintained an e-commerce platform for the Whirlpool group\nWorked with VTEX, React, GraphQL, and CSS to deliver quality solutions'
        ),
      },
    },
    {
      sys: { id: 'job4' },
      fields: {
        companyName: 'Paradigma',
        period: '2020 - 2022',
        description: createRichText(
          'Built interactive advertising banners for mobile devices (MRAID) with Beintoo.\nBuilt a web app for enterprise mobility management for Telepass.\nKey technologies: React, Redux Toolkit, Preact, JavaScript, DOM, HTML, CSS-in-JS, Swiper.js, and Google Maps API.'
        ),
      },
    },
  ],
  works: [
    {
      sys: { id: 'work1' },
      fields: {
        title: 'Bollette Calcio',
        link: 'https://example.com', // Placeholder as link wasn't explicit in scrape
        description: createRichText(
          'Bollette Calcio is a web app allowing fake bets on the most popular soccer/football championships. Includes also a poker section and an AI-powered betting assistant. Server made with Nest.js, using Redis for caching and storing tokens, and MySql as db to store tickets and user data. Client made with React'
        ),
        image: {
          sys: { id: '1' },
          fields: {
            title: 'Bollette Calcio',
            description: 'A snapshot of the Bollette Calcio app',
            file: {
              url: 'https://images.ctfassets.net/t1zavav918it/3X6LHpBbeusmYJj4MkgK18/e3f4bdaff47d61d816f830c6d81ce887/image.png?w=800&h=270&q=50&fm=png',
              details: { size: 1000, image: { width: 600, height: 400 } },
              fileName: 'image.png',
              contentType: 'image/png',
            },
          },
        },
      },
    },
    {
      sys: { id: 'work2' },
      fields: {
        title: 'Casa Mons. Michele Cosentino',
        link: 'https://example.com',
        description: createRichText(
          'Casa Michele Cosentino is a website showcasing a nursing home for the elderly, highlighting all its strengths with a simple yet engaging design. The site is built with Gatsby.'
        ),
        image: {
          sys: { id: '1' },
          fields: {
            title: 'Casa Mons. Michele Cosentino',
            description:
              'A snapshot of the Casa Mons. Michele Cosentino website',
            file: {
              url: 'https://images.ctfassets.net/t1zavav918it/3X6LHpBbeusmYJj4MkgK18/e3f4bdaff47d61d816f830c6d81ce887/image.png?w=800&h=270&q=50&fm=png',
              details: { size: 1000, image: { width: 600, height: 400 } },
              fileName: 'image.png',
              contentType: 'image/png',
            },
          },
        },
      },
    },
    {
      sys: { id: 'work3' },
      fields: {
        title: 'Schedule Mate',
        link: 'https://example.com',
        description: createRichText(
          "Schedule Mate is a service that allows professionals to provide their clients with a calendar through which the clients can book an appointment. Appointments are saved in the professional's Google Calendar, while appointment requests are received through a Telegram channel, which allows the professional to save the appointment to their calendar with the click of a button."
        ),
        image: {
          sys: { id: '1' },
          fields: {
            title: 'Schedule Mate',
            description: 'A snapshot of the Schedule Mate app',
            file: {
              url: 'https://images.ctfassets.net/t1zavav918it/3X6LHpBbeusmYJj4MkgK18/e3f4bdaff47d61d816f830c6d81ce887/image.png?w=800&h=270&q=50&fm=png',
              details: { size: 1000, image: { width: 600, height: 400 } },
              fileName: 'image.png',
              contentType: 'image/png',
            },
          },
        },
      },
    },
    {
      sys: { id: 'work4' },
      fields: {
        title: 'Private Chef Catania',
        link: 'https://example.com',
        description: createRichText(
          'Private Chef Catania is a landing page built with Gatsby that promotes the services of a home chef. Features: A form that sends a request for information to the designated Telegram channel. Fetching the latest Google reviews. Menu, Gallery, Biography populated through the Contentful platform.'
        ),
        image: {
          sys: { id: '1' },
          fields: {
            title: 'Private Chef Catania',
            description: 'A snapshot of the Private Chef Catania landing page',
            file: {
              url: 'https://images.ctfassets.net/t1zavav918it/3X6LHpBbeusmYJj4MkgK18/e3f4bdaff47d61d816f830c6d81ce887/image.png?w=800&h=270&q=50&fm=png',
              details: { size: 1000, image: { width: 600, height: 400 } },
              fileName: 'image.png',
              contentType: 'image/png',
            },
          },
        },
      },
    },
  ],
  // Built from SITE.social: empty URLs are skipped so no broken link is rendered.
  contacts: (
    [
      { sys: { id: 'contact-linkedin' }, fields: { name: 'LinkedIn', linkTo: SITE.social.linkedin } },
      { sys: { id: 'contact-github' }, fields: { name: 'GitHub', linkTo: SITE.social.github } },
    ] as Contact[]
  ).filter((c) => Boolean(c.fields.linkTo)),
  testimonials: [],
};

// ---------------------------------------------------------------------------
// Localisation. The Contentful space has one locale (en-US), so Italian copy
// lives in parallel "*It" fields. For Italian pages we swap them in, falling
// back to English wherever the Italian field is empty.
// ---------------------------------------------------------------------------

const pickText = (it: string | undefined, en: string | undefined) =>
  it && it.trim() ? it : en;

const pickDoc = <T extends Document | undefined>(
  it: Document | undefined,
  en: T
): Document | T => (it && hasContent(it) ? it : en);

export const localizeWork = (work: Work, locale: Locale): Work => {
  if (locale !== 'it') return work;
  const f = work.fields;
  return {
    ...work,
    fields: {
      ...f,
      tagline: pickText(f.taglineIt, f.tagline),
      role: pickText(f.roleIt, f.role),
      period: pickText(f.periodIt, f.period),
      description: pickDoc(f.descriptionIt, f.description),
      caseStudy: pickDoc(f.caseStudyIt, f.caseStudy),
      hindsight: pickDoc(f.hindsightIt, f.hindsight),
    },
  };
};

const localizeJob = (job: Job, locale: Locale): Job =>
  locale === 'it'
    ? {
        ...job,
        fields: {
          ...job.fields,
          description: pickDoc(job.fields.descriptionIt, job.fields.description),
        },
      }
    : job;

const localizeSection = (section: Section, locale: Locale): Section =>
  locale === 'it'
    ? {
        ...section,
        fields: {
          ...section.fields,
          title: pickText(section.fields.titleIt, section.fields.title) ?? '',
          paragraph: pickDoc(
            section.fields.paragraphIt,
            section.fields.paragraph
          ),
        },
      }
    : section;

const localizeTestimonial = (t: Testimonial, locale: Locale): Testimonial =>
  locale === 'it'
    ? {
        ...t,
        fields: {
          ...t.fields,
          quote: pickText(t.fields.quoteIt, t.fields.quote) ?? '',
        },
      }
    : t;

// Client work first, then agentic, then personal; featured ones lead each group.
const CATEGORY_ORDER = { client: 0, agentic: 1, personal: 2 } as const;
const sortWorks = (works: Work[]) =>
  [...works].sort((a, b) => {
    const featured = Number(!!b.fields.featured) - Number(!!a.fields.featured);
    if (featured) return featured;
    const ca = CATEGORY_ORDER[a.fields.category ?? 'personal'] ?? 3;
    const cb = CATEGORY_ORDER[b.fields.category ?? 'personal'] ?? 3;
    return ca - cb;
  });

// The Contentful SDK doesn't go through Next's fetch cache, so the raw
// (English) works are memoised per process: one request per build.
let worksPromise: Promise<Work[]> | null = null;

const fetchWorks = (): Promise<Work[]> => {
  if (!client) return Promise.resolve(sortWorks(mockData.works));
  if (worksPromise) return worksPromise;

  const request = client
    .getEntries<WorkSkeleton>({ content_type: 'work', limit: 100 })
    .then((res) => sortWorks(res.items as unknown as Work[]))
    .catch((error) => {
      console.error('Error fetching works from Contentful:', error);
      worksPromise = null;
      return sortWorks(mockData.works);
    });
  worksPromise = request;
  return request;
};

export async function getWorks(locale: Locale = 'en'): Promise<Work[]> {
  const works = await fetchWorks();
  return works.map((w) => localizeWork(w, locale));
}

export async function getWorkBySlug(
  slug: string,
  locale: Locale = 'en'
): Promise<Work | undefined> {
  const works = await getWorks(locale);
  return works.find((work) => workSlug(work) === slug);
}

async function getSections(): Promise<Section[]> {
  if (!client) return mockData.sections;
  try {
    const res = await client.getEntries<SectionSkeleton>({
      content_type: 'section',
    });
    const fromCms = res.items as unknown as Section[];
    // Keep mock sections for ids not (yet) managed in Contentful.
    const ids = new Set(fromCms.map((s) => s.fields.sectionId));
    return [
      ...fromCms,
      ...mockData.sections.filter((s) => !ids.has(s.fields.sectionId)),
    ];
  } catch (error) {
    console.error('Error fetching sections from Contentful:', error);
    return mockData.sections;
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries<TestimonialSkeleton>({
      content_type: 'testimonial',
    });
    return (res.items as unknown as Testimonial[]).sort(
      (a, b) => (a.fields.order ?? 99) - (b.fields.order ?? 99)
    );
  } catch (error) {
    console.error('Error fetching testimonials from Contentful:', error);
    return [];
  }
}

export async function getPageData(locale: Locale = 'en'): Promise<PageData> {
  if (!client) {
    console.warn('Contentful credentials not found, using mock data.');
  }

  let jobs: Job[] = mockData.jobs;
  if (client) {
    try {
      const res = await client.getEntries<JobSkeleton>({ content_type: 'job' });
      jobs = res.items as unknown as Job[];
    } catch (error) {
      console.error('Error fetching jobs from Contentful:', error);
    }
  }

  const [works, sections, testimonials] = await Promise.all([
    getWorks(locale),
    getSections(),
    getTestimonials(),
  ]);

  return {
    sections: sections.map((s) => localizeSection(s, locale)),
    jobs: jobs.map((j) => localizeJob(j, locale)),
    works,
    contacts: mockData.contacts,
    testimonials: testimonials.map((t) => localizeTestimonial(t, locale)),
  };
}
