import { CSSProperties, Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { WorkCube } from '../ServiceCube';
import { site } from '../../config/site';
import { scrollToId } from '../../lib/scroll';
import { Button } from '../Button';

/** Brand accents in the headline: the "complex" part stays quiet, "simple" gets the green marker */
const wordTone = (w: string) => {
  const k = w.toLowerCase().replace(/[^a-z]/g, '');
  if (k === 'complex' || k === 'things') return ' h3d__word--complex';
  if (k === 'simple') return ' h3d__word--simple';
  return '';
};

export function Hero3D({ nextSectionId }: { nextSectionId: string }) {
  const h = site.hero3d;
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress drives the hero's exit (the text drifts and fades)
  useEffect(() => {
    let frame = 0, lastP = -1;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const p = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      // only touch the style when it actually changes (it stays at 1 once the hero has scrolled away)
      if (Math.abs(p - lastP) < 0.001) return;
      lastP = p;
      el.style.setProperty('--hero-scroll', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const words = h.headline.split(' ');

  return (
    <section ref={sectionRef} className="h3d h3d--text" aria-labelledby="hero-title">

      <div className="container h3d__content">
        <p className="h3d__eyebrow">{h.eyebrow}</p>
        <div className="h3d__row">
          <h1 id="hero-title" className="h3d__title" aria-label={h.headline}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className={`h3d__word${wordTone(w)}`} aria-hidden="true">
                  <span style={{ '--i': i } as CSSProperties}>{w}</span>
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
          <WorkCube />
        </div>
        <div className="h3d__ctas">
          <Button to={h.primaryCta.to}>{h.primaryCta.label}</Button>
          <Link to={h.secondaryCta.to} className="h3d__secondary">
            <span>{h.secondaryCta.label}</span>
          </Link>
        </div>
      </div>

      <div className="container h3d__bottom">
        {h.available && (
          <p className="h3d__status">
            <span className="h3d__dot" aria-hidden="true" />
            {h.availability}
          </p>
        )}
        <a
          href={`#${nextSectionId}`}
          className="h3d__scroll"
          onClick={(e) => {
            e.preventDefault();
            scrollToId(nextSectionId);
          }}
        >
          <span>{h.scrollLabel}</span>
          <span className="h3d__scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
