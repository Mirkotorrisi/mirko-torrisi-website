import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { Contact } from '@/types/contentful';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';
import { SITE } from '@/lib/site';

type Props = {
  lang: Locale;
  dict: Dictionary['contact'];
  contacts: Contact[];
};

export default function ContactSection({ lang, dict, contacts }: Props) {
  const direct = [
    SITE.email && {
      href: `mailto:${SITE.email}`,
      label: dict.emailLabel,
      value: SITE.email,
      Icon: Mail,
    },
    SITE.whatsapp && {
      href: `https://wa.me/${SITE.whatsapp}`,
      label: dict.whatsappLabel,
      value: `+${SITE.whatsapp}`,
      Icon: MessageCircle,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    value: string;
    Icon: typeof Mail;
  }[];

  return (
    <section
      id="contact"
      className="flex scroll-mt-20 flex-col items-center bg-zinc-950 px-4 pt-32 pb-12 text-white"
    >
      <h2 className="text-center text-5xl font-bold">{dict.heading}</h2>
      <p className="mt-6 mb-12 max-w-xl text-center text-lg text-zinc-400">
        {dict.intro}
      </p>

      <div className="w-full max-w-2xl">
        <ContactForm lang={lang} dict={dict} />
      </div>

      <p className="mt-16 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
        {dict.direct}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-8">
        {direct.map(({ href, label, value, Icon }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
          >
            <div className="rounded-full border border-zinc-800 bg-zinc-900 p-5 transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/10">
              <Icon
                size={28}
                className="text-zinc-400 transition-colors group-hover:text-blue-500"
              />
            </div>
            <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
              {label}
              <span className="sr-only">: {value}</span>
            </span>
          </a>
        ))}
        {contacts.map((contact) => {
          const name = contact.fields.name.toLowerCase();
          const Icon = name.includes('github')
            ? Github
            : name.includes('linkedin')
              ? Linkedin
              : Mail;

          return (
            <a
              key={contact.sys.id}
              href={contact.fields.linkTo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
            >
              <div className="rounded-full border border-zinc-800 bg-zinc-900 p-5 transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/10">
                <Icon
                  size={28}
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
        © {new Date().getFullYear()} {SITE.name}. {dict.rights}
      </footer>
    </section>
  );
}
