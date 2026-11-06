import { useMemo, useState } from 'react';
import { projects, typesOf } from '../content/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { ExperienceSection } from '../components/ExperienceSection';

export default function Works() {
  useDocumentMeta('Works', 'Selected product design work by Jubran Elias, freelance product designer.');
  // only the kinds that filter anything: a chip that matches a single project is noise
  const categories = useMemo(() => {
    const count = new Map<string, number>();
    projects.flatMap((p) => typesOf(p)).forEach((t) => count.set(t, (count.get(t) ?? 0) + 1));
    return ['All', ...[...count.entries()].filter(([, n]) => n > 1).map(([t]) => t)];
  }, []);
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? projects : projects.filter((p) => typesOf(p).includes(filter));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">
            <SplitText as="span" text="Work" />
          </h1>
          <h2 className="visually-hidden">Projects</h2>
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
