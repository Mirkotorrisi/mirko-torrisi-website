import type { Locale } from './config';
import type { WorkCategory } from '@/types/contentful';

export type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
  // Work slugs shown as examples under the service.
  examples: string[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    works: string;
    about: string;
    contact: string;
    cta: string;
    switchTo: string;
  };
  hero: {
    badge: string;
    role: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    examplesLabel: string;
    items: Service[];
  };
  testimonials: { heading: string };
  techStack: { heading: string; categories: string[] };
  curriculum: { heading: string };
  works: {
    heading: string;
    intro: string;
    view: string;
    categories: Record<WorkCategory, string>;
    back: string;
    visit: string;
    source: string;
    hindsight: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
    next: string;
  };
  contact: {
    heading: string;
    intro: string;
    fields: {
      name: { label: string; placeholder: string; error: string };
      email: { label: string; placeholder: string; error: string };
      message: { label: string; placeholder: string; error: string };
    };
    submit: string;
    sending: string;
    success: string;
    error: string;
    direct: string;
    emailLabel: string;
    whatsappLabel: string;
    rights: string;
  };
};

const en: Dictionary = {
  meta: {
    title: 'Mirko Torrisi – Freelance Full Stack Developer & AI agents | Catania',
    description:
      'Freelance full stack developer in Catania, Sicily. I build websites for businesses, B2B web platforms and AI agents with React, Next.js, TypeScript, NestJS and Python.',
  },
  nav: {
    services: 'Services',
    works: 'Work',
    about: 'About',
    contact: 'Contact',
    cta: "Let's talk",
    switchTo: 'Italiano',
  },
  hero: {
    badge: 'Available for new projects',
    role: 'Full Stack Developer',
    headline:
      'I build websites, web platforms and AI agents that solve real business problems.',
    sub: 'Freelance developer based in Catania, working with clients in Italy and abroad.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See my work',
  },
  services: {
    eyebrow: 'What I can do for you',
    heading: 'Services',
    intro:
      'From a fast company website to a custom platform or an AI assistant: one developer from the first call to the production release.',
    examplesLabel: 'Examples',
    items: [
      {
        id: 'websites',
        title: 'Websites for businesses',
        body: 'Fast, bilingual websites that bring in enquiries, with a CMS you can update yourself.',
        points: [
          'Built for search engines and local SEO',
          'Contact forms that actually reach you',
          'Content you can edit without calling a developer',
        ],
        examples: ['private-chef-catania', 'trialux', 'agm-costruzioni'],
      },
      {
        id: 'platforms',
        title: 'Web platforms & B2B dashboards',
        body: 'Admin panels, internal tools and data-heavy dashboards, the same kind of work I do for enterprise clients.',
        points: [
          'React / Next.js frontends, NestJS or Python backends',
          'Real-time data, authentication and roles',
          'Docker, CI/CD and cloud deployment',
        ],
        examples: ['bollette-calcio'],
      },
      {
        id: 'ai',
        title: 'AI agents & automation',
        body: 'Assistants and agents that connect to your data and tools and take repetitive work off your team.',
        points: [
          'Natural-language interfaces on top of your systems',
          'Document and data processing with LLMs and RAG',
          'MCP integrations with Claude and other models',
        ],
        examples: [
          'finance-assistant',
          'fantasy-football-ai-auction',
          'macchinina',
        ],
      },
    ],
  },
  testimonials: { heading: 'What clients say' },
  techStack: {
    heading: 'Tech Stack',
    categories: [
      'Frontend Ecosystem',
      'Backend & Architecture',
      'AI & Emerging Tech',
      'Database & DevOps',
      'Workflow & Tools',
    ],
  },
  curriculum: { heading: 'Experience' },
  works: {
    heading: 'Selected Works',
    intro: 'Client projects, AI experiments and products I built end to end.',
    view: 'Read the case study',
    categories: {
      client: 'Client work',
      agentic: 'Agentic AI',
      personal: 'Personal project',
    },
    back: 'Back to portfolio',
    visit: 'Visit project',
    source: 'Source code',
    hindsight: 'What I would do differently today',
    ctaHeading: 'Need something similar?',
    ctaBody:
      'Tell me about your project: I usually reply within one working day.',
    ctaButton: 'Get in touch',
    next: 'Next project',
  },
  contact: {
    heading: "Let's work together",
    intro:
      'Tell me what you need and when. I usually reply within one working day.',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
        error: 'Please enter your name',
      },
      email: {
        label: 'Email',
        placeholder: 'you@company.com',
        error: 'Please enter a valid email',
      },
      message: {
        label: 'Your project',
        placeholder: 'What do you need, and by when?',
        error: 'Please write a short message',
      },
    },
    submit: 'Send message',
    sending: 'Sending…',
    success: "Thanks! Your message has arrived, I'll get back to you soon.",
    error:
      'Something went wrong and your message was not sent. Please try again or contact me directly.',
    direct: 'Or reach me directly',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    rights: 'All rights reserved.',
  },
};

const it: Dictionary = {
  meta: {
    title:
      'Mirko Torrisi – Sviluppatore web freelance a Catania | Siti, piattaforme e agenti AI',
    description:
      'Sviluppatore full stack freelance a Catania. Realizzo siti per aziende, piattaforme web B2B e agenti AI con React, Next.js, TypeScript, NestJS e Python.',
  },
  nav: {
    services: 'Servizi',
    works: 'Lavori',
    about: 'Chi sono',
    contact: 'Contatti',
    cta: 'Parliamone',
    switchTo: 'English',
  },
  hero: {
    badge: 'Disponibile per nuovi progetti',
    role: 'Sviluppatore Full Stack',
    headline:
      'Realizzo siti, piattaforme web e agenti AI che risolvono problemi concreti.',
    sub: 'Sviluppatore freelance a Catania, lavoro con clienti in Italia e all’estero.',
    ctaPrimary: 'Parliamo del tuo progetto',
    ctaSecondary: 'Guarda i lavori',
  },
  services: {
    eyebrow: 'Cosa posso fare per te',
    heading: 'Servizi',
    intro:
      'Dal sito aziendale veloce alla piattaforma su misura o all’assistente AI: un unico sviluppatore dalla prima call alla messa online.',
    examplesLabel: 'Esempi',
    items: [
      {
        id: 'websites',
        title: 'Siti web per aziende',
        body: 'Siti veloci e bilingue che portano richieste di contatto, con un CMS che puoi aggiornare da solo.',
        points: [
          'Pensati per Google e per la SEO locale',
          'Form di contatto che ti arrivano davvero',
          'Contenuti modificabili senza chiamare uno sviluppatore',
        ],
        examples: ['private-chef-catania', 'trialux', 'agm-costruzioni'],
      },
      {
        id: 'platforms',
        title: 'Piattaforme web e dashboard B2B',
        body: 'Pannelli di amministrazione, strumenti interni e dashboard con molti dati: lo stesso tipo di lavoro che faccio per clienti enterprise.',
        points: [
          'Frontend React / Next.js, backend NestJS o Python',
          'Dati in tempo reale, autenticazione e ruoli',
          'Docker, CI/CD e deploy in cloud',
        ],
        examples: ['bollette-calcio'],
      },
      {
        id: 'ai',
        title: 'Agenti AI e automazione',
        body: 'Assistenti e agenti che si collegano ai tuoi dati e ai tuoi strumenti e tolgono lavoro ripetitivo al tuo team.',
        points: [
          'Interfacce in linguaggio naturale sui tuoi sistemi',
          'Elaborazione di documenti e dati con LLM e RAG',
          'Integrazioni MCP con Claude e altri modelli',
        ],
        examples: [
          'finance-assistant',
          'fantasy-football-ai-auction',
          'macchinina',
        ],
      },
    ],
  },
  testimonials: { heading: 'Cosa dicono i clienti' },
  techStack: {
    heading: 'Tecnologie',
    categories: [
      'Frontend',
      'Backend e architettura',
      'AI e nuove tecnologie',
      'Database e DevOps',
      'Strumenti di lavoro',
    ],
  },
  curriculum: { heading: 'Esperienza' },
  works: {
    heading: 'Lavori selezionati',
    intro:
      'Progetti per clienti, esperimenti con l’AI e prodotti realizzati da cima a fondo.',
    view: 'Leggi il caso studio',
    categories: {
      client: 'Lavoro per cliente',
      agentic: 'AI agentica',
      personal: 'Progetto personale',
    },
    back: 'Torna ai lavori',
    visit: 'Visita il progetto',
    source: 'Codice sorgente',
    hindsight: 'Cosa farei diversamente oggi',
    ctaHeading: 'Ti serve qualcosa di simile?',
    ctaBody:
      'Raccontami il tuo progetto: di solito rispondo entro un giorno lavorativo.',
    ctaButton: 'Contattami',
    next: 'Progetto successivo',
  },
  contact: {
    heading: 'Lavoriamo insieme',
    intro:
      'Scrivimi di cosa hai bisogno e con che tempi. Di solito rispondo entro un giorno lavorativo.',
    fields: {
      name: {
        label: 'Nome',
        placeholder: 'Il tuo nome',
        error: 'Inserisci il tuo nome',
      },
      email: {
        label: 'Email',
        placeholder: 'tu@azienda.it',
        error: 'Inserisci un’email valida',
      },
      message: {
        label: 'Il tuo progetto',
        placeholder: 'Di cosa hai bisogno, e entro quando?',
        error: 'Scrivi un breve messaggio',
      },
    },
    submit: 'Invia messaggio',
    sending: 'Invio in corso…',
    success: 'Grazie! Il messaggio è arrivato, ti rispondo a breve.',
    error:
      'Qualcosa è andato storto e il messaggio non è stato inviato. Riprova oppure contattami direttamente.',
    direct: 'Oppure contattami direttamente',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    rights: 'Tutti i diritti riservati.',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, it };

export const getDictionary = (locale: Locale) => dictionaries[locale];
