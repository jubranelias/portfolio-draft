import { lazy, Suspense } from 'react';
const JourneyGlobe = lazy(() => import('../components/JourneyGlobe').then((m) => ({ default: m.JourneyGlobe })));
import { site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { InterestIcon } from '../components/InterestIcon';
import portrait640 from '../assets/images/portrait/jubran-640.webp';
import portrait1100 from '../assets/images/portrait/jubran-1100.webp';

export default function About() {
  const a = site.about;
  useDocumentMeta('About', a.title);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">{a.kicker}</p>
          <SplitText as="h1" text={a.title} className="page-hero__title page-hero__title--wide" />
        </div>
      </section>

      <section className="section story" aria-label="My story">
        <div className="container story__grid">
          <div className="story__side">
            <Reveal as="figure" className="portrait">
              {/* Two small WebP sizes; the browser downloads only the one that fits the screen,
                  and only when the photo is about to scroll into view */}
              <img
                src={portrait640}
                srcSet={`${portrait640} 640w, ${portrait1100} 1100w`}
                sizes="(max-width: 760px) 92vw, 40vw"
                width={1100}
                height={1375}
                loading="lazy"
                decoding="async"
                alt="Portrait of Jubran Elias lit in green and blue light against a dark background"
              />
            </Reveal>
          </div>
          <div className="story__text">
            {a.story.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} className="story__body" delay={Math.min(i, 2) * 90}>
                {p}
              </Reveal>
            ))}
            <Reveal as="p" className="story__closing">{a.story.closing}</Reveal>
          </div>
        </div>
      </section>

      <section className="section interests" aria-labelledby="interests-title">
        <div className="container">
          <SplitText id="interests-title" text={a.interests.title} className="section-title interests__title" />
          <ul className="interests__grid">
            {a.interests.items.map((it, i) => (
              <Reveal as="li" key={it.title} className={`fun fun--${it.icon}`} delay={i * 110} tabIndex={0}>
                <span className="fun__icon" aria-hidden="true">
                  <InterestIcon name={it.icon} />
                </span>
                <h3 className="fun__title">{it.title}</h3>
                <p className="fun__note">{it.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Suspense fallback={<div className="case-loading" aria-busy="true" />}>
        <JourneyGlobe />
      </Suspense>



    </>
  );
}
