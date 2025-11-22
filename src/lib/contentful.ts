import { createClient } from 'contentful';
import { PageData, Section, Job, Work, Contact, SectionSkeleton, JobSkeleton, WorkSkeleton, ContactSkeleton } from '@/types/contentful';
import { Document, BLOCKS } from '@contentful/rich-text-types';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = (SPACE_ID && ACCESS_TOKEN)
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
                paragraph: createRichText('Passionate about writing scalable, maintainable, and clean code, I approach every project with precision, adaptability, and a commitment to continuous learning.'),
                image: mockImage,
            },
        },
        {
            sys: { id: 'about' },
            fields: {
                title: 'This is Mirko Torrisi',
                sectionId: 'about',
                paragraph: createRichText('Mirko Torrisi, a passionate web developer based in Catania. With a degree in Economics, I discovered my love for programming in 2019, undergoing comprehensive training at the Steve Jobs Academy in all facets of web development. Since then, I\'ve honed my skills and tackled challenging projects, evolving into a proficient Full Stack developer with expertise in TypeScript/JavaScript, React, NestJS, and MongoDB. My strength lies in my constant quest for new challenges and my dedication to overcoming them. Engaged with the developer community, I\'m always seeking fresh inspiration and professional growth opportunities.'),
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
                description: [
                    'Built multiple websites for different sporting leagues using Next.js, TailwindCSS, React, Storybook, and Styled Components for high-quality UI development.',
                    'Clients: ICC, Atalanta, Liv Golf'
                ],
            },
        },
        {
            sys: { id: 'job2' },
            fields: {
                companyName: 'Odds and More',
                period: '2021 - today',
                description: [
                    'Built and maintained multiple web applications and microservices for a betting services platform.',
                    'Proficiently used Angular, NestJS, Python, MongoDB, Redis, RabbitMQ for scalable solutions.'
                ],
            },
        },
        {
            sys: { id: 'job3' },
            fields: {
                companyName: 'IT Partner Italia',
                period: '2021',
                description: [
                    'Maintained an e-commerce platform for the Whirlpool group',
                    'Worked with VTEX, React, GraphQL, and CSS to deliver quality solutions'
                ],
            },
        },
        {
            sys: { id: 'job4' },
            fields: {
                companyName: 'Paradigma',
                period: '2020 - 2022',
                description: [
                    'Built interactive advertising banners for mobile devices (MRAID) with Beintoo.',
                    'Built a web app for enterprise mobility management for Telepass.',
                    'Key technologies: React, Redux Toolkit, Preact, JavaScript, DOM, HTML, CSS-in-JS, Swiper.js, and Google Maps API.'
                ],
            },
        },
    ],
    works: [
        {
            sys: { id: 'work1' },
            fields: {
                title: 'Bollette Calcio',
                link: 'https://example.com', // Placeholder as link wasn't explicit in scrape
                description: createRichText('Bollette Calcio is a web app allowing fake bets on the most popular soccer/football championships. Includes also a poker section and an AI-powered betting assistant. Server made with Nest.js, using Redis for caching and storing tokens, and MySql as db to store tickets and user data. Client made with React'),
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
                description: createRichText('Casa Michele Cosentino is a website showcasing a nursing home for the elderly, highlighting all its strengths with a simple yet engaging design. The site is built with Gatsby.'),
                image: {
                    sys: { id: '1' },
                    fields: {
                        title: 'Casa Mons. Michele Cosentino',
                        description: 'A snapshot of the Casa Mons. Michele Cosentino website',
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
                description: createRichText('Schedule Mate is a service that allows professionals to provide their clients with a calendar through which the clients can book an appointment. Appointments are saved in the professional\'s Google Calendar, while appointment requests are received through a Telegram channel, which allows the professional to save the appointment to their calendar with the click of a button.'),
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
                description: createRichText('Private Chef Catania is a landing page built with Gatsby that promotes the services of a home chef. Features: A form that sends a request for information to the designated Telegram channel. Fetching the latest Google reviews. Menu, Gallery, Biography populated through the Contentful platform.'),
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
    contacts: [
        {
            sys: { id: 'contact1' },
            fields: {
                name: 'LinkedIn',
                linkTo: 'https://linkedin.com',
            },
        },
        {
            sys: { id: 'contact2' },
            fields: {
                name: 'GitHub',
                linkTo: 'https://github.com',
            },
        },
    ],
};

export async function getPageData(): Promise<PageData> {
    if (!client) {
        console.warn('Contentful credentials not found, using mock data.');
        return mockData;
    }

    try {
        // In a real scenario, you'd probably fetch specific content types
        // For now, we'll just simulate fetching all and mapping them
        // This is a simplification. You would typically have separate fetch functions.

        // Example of how you might fetch if you had the credentials
        // const sections = await client.getEntries<SectionSkeleton>({ content_type: 'section' });
        // const jobs = await client.getEntries<JobSkeleton>({ content_type: 'job' });
        // const works = await client.getEntries<WorkSkeleton>({ content_type: 'work' });
        // const contacts = await client.getEntries<ContactSkeleton>({ content_type: 'contact' });

        // return {
        //     sections: sections.items as unknown as Section[],
        //     jobs: jobs.items as unknown as Job[],
        //     works: works.items as unknown as Work[],
        //     contacts: contacts.items as unknown as Contact[]
        // }

        // Returning mock data even if client exists for now as we don't have real content types set up in the user's space yet
        return mockData;
    } catch (error) {
        console.error('Error fetching data from Contentful:', error);
        return mockData;
    }
}
