import { useMemo, useState } from 'react';
import { projects, typesOf } from '../content/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { ExperienceSection } from '../components/ExperienceSection';

export default function Works() {
  useDocumentMeta('Works', 'Selected product design work by Jubran Elias, freelance product designer.');
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.flatMap((p) => typesOf(p))))], []);
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? projects : projects.filter((p) => typesOf(p).includes(filter));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">
            <SplitText as="span" text="Work" />
          </h1>
          <div className="filters" role="group" aria-label="Filter projects">
            {categories.map((c) => (
              <button key={c} className={`chip ${filter === c ? 'chip--active' : ''}`} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section-s">
        <div className="container pgrid pgrid--even">
          {list.map((p, i) => (
            <Reveal key={p.slug} className="pgrid__item" delay={(i % 2) * 120}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <ExperienceSection />
    </>
  );
}
