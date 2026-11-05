import { CSSProperties } from 'react';
import { site } from '../config/site';

/** Every logo gets a box sized by its shape, so wide wordmarks and square marks look equally heavy,
 *  and the mono mark and its colour version fill exactly the same box. */
const boxSize = (ratio: number) => {
  const h = ratio < 1.4 ? 46 : ratio < 2.6 ? 36 : 28;
  const w = Math.min(150, Math.round(h * ratio));
  return { w, h: Math.round(w / ratio) };
};

// All client logos, resolved to URLs at build time
const logos = import.meta.glob('../assets/images/clients/*.{png,svg,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const logoUrl = (file: string) => logos[`../assets/images/clients/${file}`];

/** Infinite, pausable row of client logos, each standing on its own (no card, no shape). Rendered twice for a seamless loop. */
export function ClientMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {site.clients.map((c) => (
        <li className="client client--logo" key={c.name}>
          <span
            className="client__box"
            title={c.name}
            style={{ width: `${boxSize(c.ratio).w}px`, height: `${boxSize(c.ratio).h}px` } as CSSProperties}
          >
            {/* the one-colour mark: an ink mask filled with the theme's text colour, so it suits light and dark */}
            <span className="client__mono" role="img" aria-label={c.name} style={{ maskImage: `url(${logoUrl(c.logo)})`, WebkitMaskImage: `url(${logoUrl(c.logo)})` } as CSSProperties} />
            {c.color && (
              <img className={`client__color${c.colorDark ? ' client__color--light' : ''}`} src={logoUrl(c.color)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            )}
            {c.colorDark && (
              <img className="client__color client__color--dark" src={logoUrl(c.colorDark)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="region" aria-label="Clients">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
