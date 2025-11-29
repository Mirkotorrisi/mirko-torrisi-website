'use client';

import { formConfig } from '@/lib/form.config';
import { Contact } from '@/types/contentful';
import { Github, Linkedin, Mail } from 'lucide-react';
import Form from './Form';
import { submitForm } from '@/services/formService';

export default function ContactSection({ contacts }: { contacts: Contact[] }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(e.currentTarget);
  };
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center bg-zinc-950 py-32 text-white">
      <h2 className="mb-12 text-5xl font-bold">Let's Connect</h2>
      <Form
        handleSubmit={handleSubmit}
        formConfig={formConfig}
        submitLabel="Send Message"
        formClassNames={{
          container:
            'w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 backdrop-blur-sm shadow-xl',
          input:
            'w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          submit:
            'group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          message: 'col-span-1 md:col-span-2 h-40',
          submitContainer: 'col-span-1 md:col-span-2 flex justify-center mt-4',
          thankYouMsg:
            'col-span-1 md:col-span-2 text-center font-medium text-green-400 mt-4',
        }}
        thankYouMsg="Thank you for reaching out! I'll get back to you as soon as possible."
      />
      <div className="flex gap-8">
        {contacts.map((contact) => {
          let Icon = Mail;
          if (contact.fields.name.toLowerCase().includes('github'))
            Icon = Github;
          if (contact.fields.name.toLowerCase().includes('linkedin'))
            Icon = Linkedin;

          return (
            <a
              key={contact.sys.id}
              href={contact.fields.linkTo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
            >
              <div className="rounded-full border border-zinc-800 bg-zinc-900 p-6 transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/10">
                <Icon
                  size={32}
                  className="text-zinc-400 transition-colors group-hover:text-blue-500"
                />
              </div>
              <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
                {contact.fields.name}
              </span>
            </a>
          );
        })}
      </div>

      <footer className="mt-24 text-sm text-zinc-600">
        © {new Date().getFullYear()} Mirko Torrisi. All rights reserved.
      </footer>
    </section>
  );
}
