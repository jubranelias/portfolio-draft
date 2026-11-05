import { CSSProperties } from 'react';
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
export function CreativeTeaser() {
  // the back-left card is the painted VW bus (Kroum Ehden); the front card is Paint Up Volumes V.4, the triangle stairs
  const swaps: Record<number, { id: string; image: string }> = { 0: { id: 'vw-bus', image: vwBus }, 1: { id: 'v4-triangular', image: triangular } };
  const picks = creativeWork.slice(0, 3).map((p, i) => (swaps[i] ? { ...p, ...swaps[i] } : p));
  return (
    <section className="section-s" aria-labelledby="creative-teaser-title">
      <div className="container">
        <Link to="/dihzahyners" className="cteaser">
          <div className="cteaser__text">
            <p className="eyebrow">{creativeIntro.eyebrow}</p>
            <h2 id="creative-teaser-title" className="cteaser__title">
              {creativeIntro.teaserTitle}
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
