import Hero from '@/components/Hero';
import Curriculum from '@/components/Curriculum';
import Portfolio from '@/components/Portfolio';
import ContactSection from '@/components/Contact';
import { getPageData } from '@/lib/contentful';

export default async function Home() {
  const data = await getPageData();

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Hero />
      <Curriculum jobs={data.jobs} />
      <Portfolio works={data.works} />
      <ContactSection contacts={data.contacts} />
    </main>
  );
}
