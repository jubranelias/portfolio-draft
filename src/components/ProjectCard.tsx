import type { CSSProperties } from 'react';
import { accentVars } from '../pages/WorkDetail';
import { typesOf } from '../content/projects';
import { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../content/projects';

/** Project thumbnail with a pill that follows the pointer. A project with `external` links out instead of to a case page. */
/** travelling outline: [dash length as % of the perimeter, opacity], longest and faintest first */
const TRACE: [number, number][] = [[20, 0.22], [15, 0.4], [10, 0.65], [6, 1]];

export function ProjectCard({ project, size = 'large' }: { project: Project; size?: 'large' | 'small' }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  const inner = (
    <>
      <div className="pcard__frame">
      <svg className="pcard__trace" aria-hidden="true">
        {/* the line is a few centred dashes of falling length and rising opacity, so both ends fade out */}
        {TRACE.map(([len, op], i) => (
          <rect key={`l${i}`} className="pcard__trace-line" pathLength={100} style={{ '--len': len, '--op': op } as CSSProperties} />
        ))}
      </svg>
      <div className="pcard__media media" onPointerMove={onMove}>
        <img src={project.cover} alt={project.coverAlt} width={1200} height={900} loading="lazy" decoding="async" />
        <span className="pcard__cursor" aria-hidden="true">
          {project.external ? project.external.label : 'View case'}
        </span>
      </div>
      </div>
      <div className="pcard__meta">
        <h3 className="pcard__name">{project.name}</h3>
        <p className="pcard__summary">{project.summary}</p>
        {project.locked ? (
          <span className="pcard__tag pcard__tag--locked">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Password protected
          </span>
        ) : (
          <span className={`pcard__tag ${project.status ? 'pcard__tag--status' : ''}`}>{project.status ?? typesOf(project).join(' · ')}</span>
        )}
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
