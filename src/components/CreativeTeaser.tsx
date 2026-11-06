import { CSSProperties, useEffect, useRef, useState } from 'react';
import { PaintLayer } from './PaintLayer';
import { Link } from 'react-router-dom';
import { creativeIntro, creativeWork } from '../content/creative';
import { Reveal } from './Reveal';
import triangular from '../assets/images/teaser-triangular.webp';
import vwBus from '../assets/images/teaser-vwbus.webp';

/**
 * Home-page teaser for Dihzahyners. A quiet band placed after the product work, so the
 * hierarchy stays "product design first", with a fanned stack of three pieces that spreads
 * out on hover and links through to the gallery.
 */
/** each rolling word gets a colour from the painted stairs (deep enough to read on cream) */
const ROLL_PAINTS = ['#e0482f', '#d6338a', '#7a4ee0', '#1f86d6', '#0f9e86', '#d98a00'];

export function CreativeTeaser() {
  // the back-left card is the painted VW bus (Kroum Ehden); the front card is Paint Up Volumes V.4, the triangle stairs
  const swaps: Record<number, { id: string; image: string }> = { 0: { id: 'vw-bus', image: vwBus }, 1: { id: 'v4-triangular', image: triangular } };
  const paintHost = useRef<HTMLAnchorElement>(null);
  // the last word of the title rolls through what I paint: cities, walls, stairs, vans…
  const n = creativeIntro.teaserWords.length;
  const [word, setWord] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setWord((w) => (w + 1) % n), 2000);
    return () => clearInterval(t);
  }, [n]);
  const picks = creativeWork.slice(0, 3).map((p, i) => (swaps[i] ? { ...p, ...swaps[i] } : p));
  return (
    <section className="section-s" aria-labelledby="creative-teaser-title">
      <div className="container">
        <Link to="/dihzahyners" className="cteaser" ref={paintHost}>
          <PaintLayer host={paintHost} />
          <div className="cteaser__text">
            <p className="eyebrow">{creativeIntro.eyebrow}</p>
            <h2
              id="creative-teaser-title"
              className="cteaser__title"
              aria-label={`${creativeIntro.teaserTitle} ${creativeIntro.teaserWords.slice(0, -1).join(', ')} and ${creativeIntro.teaserWords.slice(-1)}.`}
            >
              <span aria-hidden="true">{creativeIntro.teaserTitle} </span>
              <span className="roll" aria-hidden="true">
                {creativeIntro.teaserWords.map((w, i) => (
                  <span key={w} className={`roll__word ${i === word ? 'is-on' : i === (word - 1 + n) % n ? 'is-out' : ''}`} style={{ '--paint': ROLL_PAINTS[i % ROLL_PAINTS.length] } as CSSProperties}>
                    {w}.
                  </span>
                ))}
              </span>
            </h2>
            <p className="muted cteaser__line">{creativeIntro.teaserLine}</p>
            <span className="cteaser__link">
              <span>{`Visit ${creativeIntro.title}`}</span>
              <span aria-hidden="true">→</span>
            </span>
          </div>
          <Reveal className="cteaser__stack" aria-hidden="true">
            {picks.map((p, i) => (
              <span key={p.id} className="cteaser__card" style={{ '--i': i - 1 } as CSSProperties}>
                <img src={p.image} alt="" loading="lazy" />
              </span>
            ))}
          </Reveal>
        </Link>
      </div>
    </section>
  );
}
