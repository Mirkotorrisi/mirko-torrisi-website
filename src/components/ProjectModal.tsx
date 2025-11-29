'use client';

import { Work } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: Work | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  work,
}: ProjectModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="animate-in fade-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden overflow-y-auto rounded-3xl bg-white shadow-2xl duration-300 md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur transition-colors hover:cursor-pointer hover:bg-gray-100"
        >
          <X className="h-6 w-6 text-gray-800" />
        </button>

        {/* Image Section */}
        <div className="relative h-64 w-full bg-gray-100 md:h-auto md:w-1/2">
          <img
            src={work.fields.image.fields.file.url}
            alt={work.fields.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            {work.fields.title}
          </h2>

          <div className="prose prose-lg mb-8 flex-grow overflow-y-auto text-gray-600">
            {documentToReactComponents(work.fields.description)}
          </div>

          <div className="mt-auto border-t border-gray-100 pt-6">
            <a
              href={work.fields.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800 md:w-auto"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
