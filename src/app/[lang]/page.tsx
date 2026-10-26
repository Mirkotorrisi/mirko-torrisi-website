import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Curriculum from '@/components/Curriculum';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import { getPageData } from '@/lib/contentful';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const data = await getPageData(lang);
  const aboutSection = data.sections.find((s) => s.fields.sectionId === 'about');

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main className="min-h-screen bg-limestone">
        <JsonLd lang={lang} />
        <Hero dict={dict.hero} />
        <Services lang={lang} dict={dict.services} works={data.works} />
        <Portfolio lang={lang} dict={dict.works} works={data.works} />
        <Testimonials
          heading={dict.testimonials.heading}
          testimonials={data.testimonials}
        />
        {aboutSection && <About section={aboutSection} />}
        <TechStack dict={dict.techStack} />
        <Curriculum heading={dict.curriculum.heading} jobs={data.jobs} />
        <ContactSection
          lang={lang}
          dict={dict.contact}
          contacts={data.contacts}
        />
      </main>
    </>
  );
}
