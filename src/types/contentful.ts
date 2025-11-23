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
  period: string;
}

export type JobSkeleton = EntrySkeletonType<JobFields> & {
  contentTypeId: 'job';
};

export type Job = {
  sys: { id: string };
  fields: JobFields;
};

export interface WorkFields {
  title: string;
  link: string;
  description: Document;
  image: ContentfulAsset;
}

export type WorkSkeleton = EntrySkeletonType<WorkFields> & {
  contentTypeId: 'work';
};

export type Work = {
  sys: { id: string };
  fields: WorkFields;
};

export interface SectionFields {
  title: string;
  sectionId: string;
  paragraph: Document;
  image: ContentfulAsset;
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

export type PageData = {
  sections: Section[];
  jobs: Job[];
  works: Work[];
  contacts: Contact[];
};
