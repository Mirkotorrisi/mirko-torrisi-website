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

export default function ProjectModal({ isOpen, onClose, work }: ProjectModalProps) {
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
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-6 h-6 text-gray-800" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                    <img
                        src={work.fields.image.fields.file.url}
                        alt={work.fields.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        {work.fields.title}
                    </h2>

                    <div className="prose prose-lg text-gray-600 mb-8 flex-grow overflow-y-auto">
                        {documentToReactComponents(work.fields.description)}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <a
                            href={work.fields.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Visit Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
