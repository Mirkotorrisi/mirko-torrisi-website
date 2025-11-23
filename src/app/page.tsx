import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Curriculum from '@/components/Curriculum';
import Portfolio from '@/components/Portfolio';
import ContactSection from '@/components/Contact';
import { getPageData } from '@/lib/contentful';

export default async function Home() {
  const data = await getPageData();
  const aboutSection = data.sections.find((s) => s.sys.id === 'about');

  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
      {aboutSection && <About section={aboutSection} />}
      <TechStack />
      <Curriculum jobs={data.jobs} />
      <Portfolio works={data.works} />
      <ContactSection contacts={data.contacts} />
    </main>
  );
}
