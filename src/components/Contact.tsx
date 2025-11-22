'use client';

import { Contact } from '@/types/contentful';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function ContactSection({ contacts }: { contacts: Contact[] }) {
    return (
        <section className="py-32 bg-zinc-950 text-white flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-5xl font-bold mb-12">Let's Connect</h2>

            <div className="flex gap-8">
                {contacts.map((contact) => {
                    let Icon = Mail;
                    if (contact.fields.name.toLowerCase().includes('github')) Icon = Github;
                    if (contact.fields.name.toLowerCase().includes('linkedin')) Icon = Linkedin;

                    return (
                        <a
                            key={contact.sys.id}
                            href={contact.fields.linkTo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
                        >
                            <div className="p-6 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors">
                                <Icon size={32} className="text-zinc-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
                                {contact.fields.name}
                            </span>
                        </a>
                    );
                })}
            </div>

            <footer className="mt-24 text-zinc-600 text-sm">
                © {new Date().getFullYear()} Mirko Torrisi. All rights reserved.
            </footer>
        </section>
    );
}
