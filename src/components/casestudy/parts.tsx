import { Link } from 'react-router-dom';
/** Shared building blocks for the long-form case studies (site design; styles in casestudy-hisense.css). */
import { ReactNode } from 'react';
import { SplitText } from '../SplitText';
import { Reveal } from '../Reveal';

/** Case-study hero: small label, big title, optional intro, and a row of project details. */
export function CaseHero({ label, title, intro, meta = [] }: { label: string; title: string; intro?: string; meta?: [string, string][] }) {
  return (
    <header className="page-hero case-hero">
      <div className="container">
        <Link to="/works" className="case-back">
          <span className="case-back__arrow" aria-hidden="true">←</span> Work
        </Link>
        <p className="kicker">{label}</p>
        <SplitText as="h1" text={title} className="page-hero__title page-hero__title--wide" />
        {intro && <Reveal as="p" className="page-hero__intro hs-intro">{intro}</Reveal>}
        {meta.length > 0 && (
          <dl className="case-meta">
            {meta.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}

/** One chapter: number and label on the left, content on the right. */
export function Section({ n, label, title, children, id }: { n: string; label: string; title: string; children: ReactNode; id: string }) {
  return (
    <section className="section-s hs-section" aria-labelledby={id}>
      <div className="container case-block__grid">
        <p className="kicker hs-num">
          <span>{n}</span>{label ? ` ${label}` : ''}
        </p>
        <div className="hs-content">
          <SplitText id={id} text={title} className="case-block__title" />
          {children}
        </div>
      </div>
    </section>
  );
}

export const Body = ({ children }: { children: ReactNode }) => <Reveal as="p" className="case-block__text hs-body">{children}</Reveal>;

export const Chip = ({ children, solid }: { children: ReactNode; solid?: boolean }) => (
  <span className={`hs-chip ${solid ? 'hs-chip--solid' : ''}`}>{children}</span>
);

/** A grid of small cards: optional number, title, text. */
export function Cards({ items, cols = 3 }: { items: { n?: string; title: string; text: string }[]; cols?: number }) {
  return (
    <div className="hs-insights" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map((it) => (
        <div className="hs-insight" key={it.title}>
          {it.n && <p className="hs-insight__n">{it.n}</p>}
          <h3 className="hs-insight__title">{it.title}</h3>
          <p className="hs-insight__text">{it.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Image slots with captions; shows a quiet placeholder until a real image is supplied. */
export function Shots({ items, height = 240 }: { items: { title: string; caption: string; src?: string; alt?: string }[]; height?: number }) {
  // Real images are shown large, one per row, at their natural proportions; empty slots keep a fixed tile
  return (
    <div className="hs-shots">
      {items.map((it) => (
        <figure className="hs-shot" key={it.title}>
          <div className={`hs-shot__media ${it.src ? 'hs-shot__media--image' : 'hs-shot__media--empty'}`} style={it.src ? undefined : { height }}>
            {it.src ? <img src={it.src} alt={it.alt ?? it.title} loading="lazy" /> : <span>Image coming soon</span>}
          </div>
          <figcaption>
            <strong>{it.title}</strong>
            <span>{it.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** A heading inside a chapter (e.g. "Research", "Insights"). */
export const SubHead = ({ children }: { children: ReactNode }) => <h3 className="hs-subhead">{children}</h3>;

/**
 * Chapter 1: Overview / TL;DR. Facts (role, team, timeline…) only where the case study states
 * them, then the problem in one line and the results as a short list.
 */
export function Overview({ facts, problem, results }: { facts: [string, ReactNode][]; problem?: ReactNode; results?: string[] }) {
  return (
    <Reveal className="hs-tldr">
      <dl className="hs-tldr__facts">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {problem && (
        <div className="hs-tldr__row">
          <p className="hs-tldr__label">Problem</p>
          <p className="hs-tldr__text">{problem}</p>
        </div>
      )}
      {results && results.length > 0 && (
        <div className="hs-tldr__row">
          <p className="hs-tldr__label">Results</p>
          <ul className="hs-tldr__results">
            {results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  );
}


/** One bold sentence that opens a chapter: the point, for people who only read headlines. */
export const Lead = ({ children }: { children: ReactNode }) => <p className="hs-lead">{children}</p>;

/** A short list of specifics under a Lead. */
export function Points({ items }: { items: string[] }) {
  return (
    <ul className="hs-points">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}


/** Folded-away detail for readers who want the full reasoning; closed by default. */
export function More({ label = 'More detail', children }: { label?: string; children: ReactNode }) {
  return (
    <details className="hs-more">
      <summary>
        <span className="hs-more__icon" aria-hidden="true" />
        {label}
      </summary>
      <div className="hs-more__body">{children}</div>
    </details>
  );
}
