import { Document } from '@contentful/rich-text-types';
import { EntrySkeletonType } from 'contentful';

export type ContentfulAsset = {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
};

export interface JobFields {
  companyName: string;
  description: Document;
  descriptionIt?: Document;
  period: string;
}

export type JobSkeleton = EntrySkeletonType<JobFields> & {
  contentTypeId: 'job';
};

export type Job = {
  sys: { id: string };
  fields: JobFields;
};

export type WorkCategory = 'agentic' | 'client' | 'personal';

export interface WorkFields {
  title: string;
  link: string;
  description: Document;
  image?: ContentfulAsset;
  slug?: string;
  tagline?: string;
  category?: WorkCategory;
  featured?: boolean;
  role?: string;
  period?: string;
  stack?: string[];
  repoUrl?: string;
  caseStudy?: Document;
  hindsight?: Document;
  // Italian variants (the space has a single Contentful locale, so Italian
  // lives in parallel fields; empty ones fall back to English).
  taglineIt?: string;
  roleIt?: string;
  periodIt?: string;
  descriptionIt?: Document;
  caseStudyIt?: Document;
  hindsightIt?: Document;
}

export type WorkSkeleton = EntrySkeletonType<WorkFields> & {
  contentTypeId: 'work';
};

export type Work = {
  sys: { id: string; updatedAt?: string };
  fields: WorkFields;
};

export interface SectionFields {
  title: string;
  sectionId: string;
  paragraph: Document;
  titleIt?: string;
  paragraphIt?: Document;
  image?: ContentfulAsset;
}

export type SectionSkeleton = EntrySkeletonType<SectionFields> & {
  contentTypeId: 'section';
};

export type Section = {
  sys: { id: string };
  fields: SectionFields;
};

export interface ContactFields {
  name: string;
  linkTo: string;
}

export type ContactSkeleton = EntrySkeletonType<ContactFields> & {
  contentTypeId: 'contact';
};

export type Contact = {
  sys: { id: string };
  fields: ContactFields;
};

export interface TestimonialFields {
  author: string;
  role?: string;
  quote: string;
  quoteIt?: string;
  order?: number;
}

export type TestimonialSkeleton = EntrySkeletonType<TestimonialFields> & {
  contentTypeId: 'testimonial';
};

export type Testimonial = {
  sys: { id: string };
  fields: TestimonialFields;
};

export type PageData = {
  sections: Section[];
  jobs: Job[];
  works: Work[];
  contacts: Contact[];
  testimonials: Testimonial[];
};
