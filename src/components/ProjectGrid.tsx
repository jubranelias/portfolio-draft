import { projects } from '../content/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';

/** Staggered two-column project grid: large and small cards alternate. */
export function ProjectGrid({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <div className="pgrid">
      {list.map((p, i) => {
        const large = i % 4 === 0 || i % 4 === 3;
        return (
          <Reveal key={p.slug} className={`pgrid__item ${large ? 'pgrid__item--large' : 'pgrid__item--small'}`} delay={(i % 2) * 120}>
            <ProjectCard project={p} size={large ? 'large' : 'small'} />
          </Reveal>
        );
      })}
    </div>
  );
}
