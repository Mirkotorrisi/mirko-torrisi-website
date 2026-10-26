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

const linkClass =
  'font-display font-semibold underline decoration-majolica-light decoration-2 underline-offset-4 transition-colors hover:text-majolica-light';

export default function ContactSection({ lang, dict, contacts }: Props) {
  const direct = [
    SITE.email && {
      href: `mailto:${SITE.email}`,
      label: dict.emailLabel,
      value: SITE.email,
    },
    SITE.whatsapp && {
      href: `https://wa.me/${SITE.whatsapp}`,
      label: dict.whatsappLabel,
      value: `+${SITE.whatsapp}`,
    },
  ].filter(Boolean) as { href: string; label: string; value: string }[];

  return (
    <section
      id="contact"
      className="on-lava scroll-mt-16 bg-lava px-5 pt-24 pb-10 text-limestone md:px-8 md:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h-section">{dict.heading}</h2>
            <p className="mt-6 max-w-[30rem] text-xl text-ash">{dict.intro}</p>

            <p className="mt-14 text-ash">{dict.direct}</p>
            <ul className="mt-4 space-y-4">
              {direct.map(({ href, label, value }) => (
                <li key={href}>
                  <span className="block text-ash">{label}</span>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`${linkClass} text-xl`}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
            {contacts.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {contacts.map((contact) => (
                  <li key={contact.sys.id}>
                    <a
                      href={contact.fields.linkTo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {contact.fields.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm lang={lang} dict={dict} />
          </div>
        </div>

        <footer className="mt-24 border-t border-limestone/20 pt-6 text-base text-ash">
          © {new Date().getFullYear()} {SITE.name}. {dict.rights}
        </footer>
      </div>
    </section>
  );
}
