import { Job } from '@/types/contentful';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const getEndYear = (period: string) => {
  const lowerPeriod = period.toLowerCase();
  if (lowerPeriod.includes('today') || lowerPeriod.includes('ongoing')) {
    return 9999;
  }
  const parts = period.split('-');
  if (parts.length > 1) {
    return parseInt(parts[1].trim(), 10);
  }
  return parseInt(period.trim(), 10);
};

const options: Options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc space-y-2 pl-5 marker:text-majolica">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="[&>p]:mb-0">{children}</li>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-2 last:mb-0">{children}</p>
    ),
  },
};

export default function Curriculum({
  heading,
  jobs,
}: {
  heading: string;
  jobs: Job[];
}) {
  const sortedJobs = [...jobs].sort(
    (a, b) => getEndYear(b.fields.period) - getEndYear(a.fields.period)
  );

  return (
    <section className="bg-limestone px-5 py-24 text-lava md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="h-section">{heading}</h2>
        <ol className="mt-16 border-t border-lava/25">
          {sortedJobs.map((job) => (
            <li
              key={job.sys.id}
              className="grid gap-3 border-b border-lava/25 py-8 md:grid-cols-12 md:gap-8"
            >
              <p className="text-basalt tabular-nums md:col-span-3">
                {job.fields.period}
              </p>
              <div className="md:col-span-8 lg:col-span-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {job.fields.companyName}
                </h3>
                <div className="mt-3">
                  {documentToReactComponents(job.fields.description, options)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
