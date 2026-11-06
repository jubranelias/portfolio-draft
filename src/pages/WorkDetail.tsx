import type React from 'react';
import { createPortal } from 'react-dom';
import { lazy, Suspense, useEffect, useRef, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getNextProject, getProject } from '../content/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import NotFound from './NotFound';

/* each case study is its own chunk, fetched only when its page opens */
const FULL_CASES: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  hisesne: lazy(() => import('../components/casestudy/HisenseCaseStudy').then((m) => ({ default: m.HisenseCaseStudy }))),
  limelines: lazy(() => import('../components/casestudy/LimelinesCaseStudy').then((m) => ({ default: m.LimelinesCaseStudy }))),
  gigthree: lazy(() => import('../components/casestudy/GigthreeCaseStudy').then((m) => ({ default: m.GigthreeCaseStudy }))),
  iconnect: lazy(() => import('../components/casestudy/IConnectCaseStudy').then((m) => ({ default: m.IConnectCaseStudy }))),
  'e-municipality': lazy(() => import('../components/casestudy/EMunicipalityCaseStudy').then((m) => ({ default: m.EMunicipalityCaseStudy }))),
  'al-hilal-bank': lazy(() => import('../components/casestudy/LockedCase').then((m) => ({ default: m.LockedCase }))),
  tummy: lazy(() => import('../components/casestudy/TummyCaseStudy').then((m) => ({ default: m.TummyCaseStudy }))),
};

/** The project's colour as CSS variables: --pa-l on light, --pa-d on dark (the stylesheet picks one) */
export const accentVars = (a?: [string, string, string?]) =>
  a ? ({ '--pa-l': a[0], '--pa-d': a[1], ...(a[2] ? { '--pa-v': a[2] } : {}) } as CSSProperties) : undefined;

/** A thin line in the project's colour across the top of the page that fills as you read */
function ReadProgress({ accent }: { accent?: [string, string, string?] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  // rendered on <body> so page-transition transforms on the page wrapper can’t move it
  return createPortal(<div ref={ref} className="read-progress" style={accentVars(accent)} aria-hidden="true" />, document.body);
}

export default function WorkDetail() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  useDocumentMeta(p?.name ?? 'Project not found', p?.summary);
  if (!p) return <NotFound />;
  const next = getNextProject(p.slug);
  const nextLink = (
    <nav className="section-s" aria-label="Next project">
      <div className="container">
        <Link to="/works" className="all-work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <Link to={`/works/${next.slug}`} className="next-case">
          <span className="muted">Next case</span>
          <span className="next-case__name">
            {next.name}
            <ArrowRight className="next-case__arrow" aria-hidden="true" />
          </span>
          <span className="media next-case__thumb">
            <img src={next.cover} alt="" loading="lazy" />
          </span>
        </Link>
      </div>
    </nav>
  );

  // Hisense has its own full case study, built from the Figma file
  const fullCase = FULL_CASES[p.slug];
  if (fullCase) {
    const FullCase = fullCase;
    return (
      <article className="case-hisense" style={accentVars(p.accent)}>
        <ReadProgress accent={p.accent} />
        <Suspense fallback={<div className="case-loading" aria-busy="true" />}>
          <FullCase />
        </Suspense>
        {nextLink}
      </article>
    );
  }

  return (
    <article>
      <header className="page-hero case-hero">
        <div className="container">
          <p className="kicker">
            {p.name}: {p.summary}
          </p>
          <SplitText as="h1" text={p.title} className="page-hero__title page-hero__title--wide" />
          <dl className="case-meta">
            <div><dt>Client</dt><dd>{p.client}</dd></div>
            <div><dt>Year</dt><dd>{p.year}</dd></div>
            <div><dt>Services</dt><dd>{p.services.join(', ')}</dd></div>
            <div><dt>Type</dt><dd>{p.category}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container">
        <div className="media case-cover">
          <img src={p.cover} alt={p.coverAlt} />
        </div>
      </div>

      <section className="section case-block" aria-labelledby="challenge">
        <div className="container case-block__grid">
          <p className="kicker">Challenge</p>
          <div>
            <SplitText id="challenge" text={p.challengeTitle} className="case-block__title" />
            <Reveal as="p" className="case-block__text">{p.challenge}</Reveal>
          </div>
        </div>
      </section>

      <div className="container case-gallery">
        {p.gallery.map((g, i) => (
          <Reveal key={g.src} className={`media case-gallery__item case-gallery__item--${i}`} delay={i * 100}>
            <img src={g.src} alt={g.alt} loading="lazy" />
          </Reveal>
        ))}
      </div>

      <section className="section case-block" aria-labelledby="solution">
        <div className="container case-block__grid">
          <p className="kicker">Solution</p>
          <div>
            <SplitText id="solution" text={p.solutionTitle} className="case-block__title" />
            <Reveal as="p" className="case-block__text">{p.solution}</Reveal>
          </div>
        </div>
      </section>

      <section className="section-s case-block case-results" aria-labelledby="results">
        <div className="container case-block__grid">
          <p className="kicker">Results</p>
          <div>
            <SplitText id="results" text={p.resultsTitle} className="case-block__title" />
            <Reveal as="p" className="case-block__text">{p.results}</Reveal>
            <dl className="outcomes">
              {p.outcomes.map((o, i) => (
                <Reveal key={o.label} className="outcome" delay={i * 100}>
                  <dt className="outcome__label">{o.label}</dt>
                  <dd className="outcome__value">{o.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <nav className="section-s" aria-label="Next project">
        <div className="container">
          <Link to="/works" className="all-work">
            <span aria-hidden="true">←</span> All work
          </Link>
          <Link to={`/works/${next.slug}`} className="next-case">
            <span className="muted">Next case</span>
            <span className="next-case__name">
              {next.name}
              <ArrowRight className="next-case__arrow" aria-hidden="true" />
            </span>
            <span className="media next-case__thumb">
              <img src={next.cover} alt="" loading="lazy" />
            </span>
          </Link>
        </div>
      </nav>

    </article>
  );
}
