import { accentVars } from '../pages/WorkDetail';
import { typesOf } from '../content/projects';
import { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../content/projects';

/** Project thumbnail with a pill that follows the pointer. A project with `external` links out instead of to a case page. */
export function ProjectCard({ project, size = 'large' }: { project: Project; size?: 'large' | 'small' }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  const inner = (
    <>
      <div className="pcard__media media" onPointerMove={onMove}>
        <img src={project.cover} alt={project.coverAlt} loading="lazy" />
        <span className="pcard__cursor" aria-hidden="true">
          {project.external ? project.external.label : 'View case'}
        </span>
      </div>
      <div className="pcard__meta">
        <h3 className="pcard__name">{project.name}</h3>
        <p className="pcard__summary">{project.summary}</p>
        <span className={`pcard__tag ${project.status ? 'pcard__tag--status' : ''}`}>{project.status ?? typesOf(project).join(' · ')}</span>
      </div>
    </>
  );
  const cls = `pcard pcard--${size}`;
  return project.external ? (
    <a href={project.external.href} target="_blank" rel="noreferrer" className={cls} style={accentVars(project.accent)}>
      {inner}
    </a>
  ) : (
    <Link to={`/works/${project.slug}`} className={cls} style={accentVars(project.accent)}>
      {inner}
    </Link>
  );
}
