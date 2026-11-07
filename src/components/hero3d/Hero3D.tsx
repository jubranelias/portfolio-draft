import { CSSProperties, Fragment, useEffect, useRef, useState } from 'react';
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

/** "complex things": each letter knocked slightly off its baseline and angle, so the words look tangled */
const tangle = (w: string, seed: number) =>
  [...w].map((ch, k) => {
    const n = Math.sin((seed + 1) * 12.9898 + (k + 1) * 78.233) * 43758.5453;
    const r = n - Math.floor(n); // 0..1, fixed per letter so it never changes between renders
    const rot = ((r * 2 - 1) * 9).toFixed(1);
    const y = ((((r * 7) % 1) * 2 - 1) * 0.07).toFixed(3);
    return (
      <span key={k} className="h3d__ch" style={{ '--r': `${rot}deg`, '--y': `${y}em`, '--k': k + seed } as CSSProperties}>
        {ch}
      </span>
    );
  });

export function Hero3D({ nextSectionId }: { nextSectionId: string }) {
  const h = site.hero3d;
  const sectionRef = useRef<HTMLElement>(null);
  // "awake": the pointer is moving. The tool icons lift off the ground and float, and the tangled
  // letters of "complex things" straighten out. After a few still seconds everything settles back.
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    let t = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) {
      // touch screens have no pointer to move: straighten once, shortly after load
      t = window.setTimeout(() => setAwake(true), 1800);
      return () => clearTimeout(t);
    }
    const onMove = () => {
      setAwake(true);
      clearTimeout(t);
      if (!reduced) t = window.setTimeout(() => setAwake(false), 5000);
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => { removeEventListener('pointermove', onMove); clearTimeout(t); };
  }, []);

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
    <section ref={sectionRef} className={`h3d h3d--text${awake ? ' h3d--awake' : ''}`} aria-labelledby="hero-title">

      <div className="container h3d__content">
        <p className="h3d__eyebrow">{h.eyebrow}</p>
        <div className="h3d__row">
          <h1 id="hero-title" className="h3d__title" aria-label={h.headline}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className={`h3d__word${wordTone(w)}`} aria-hidden="true">
                  <span style={{ '--i': i } as CSSProperties}>{wordTone(w) === ' h3d__word--complex' ? tangle(w, i) : w}</span>
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
          <WorkCube />
        </div>
        <div className="h3d__ctas">
          <Button to={h.primaryCta.to}>{h.primaryCta.label}</Button>
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
