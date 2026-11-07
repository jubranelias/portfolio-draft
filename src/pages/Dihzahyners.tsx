import { CSSProperties, useEffect, useRef, useState } from 'react';
/**
 * Photo series inside a project are laid out as an overlapping collage: twelve slots (x, y, width
 * in % of the collage width, tilt in degrees) that repeat further down for longer series.
 * Hovering a photo pops it to the front, straight and a little larger, with its caption.
 */
const COLLAGE_SLOTS = [
  { x: 0, y: 0, w: 42, r: -3, z: 3 },
  { x: 36, y: 6, w: 34, r: 2.5, z: 4 },
  { x: 64, y: 0, w: 36, r: -2, z: 2 },
  { x: 4, y: 30, w: 32, r: 2, z: 5 },
  { x: 30, y: 34, w: 40, r: -2.5, z: 7 },
  { x: 66, y: 28, w: 34, r: 3, z: 6 },
  { x: 0, y: 60, w: 36, r: -2, z: 8 },
  { x: 32, y: 64, w: 34, r: 2, z: 9 },
  { x: 62, y: 58, w: 38, r: -3, z: 8 },
  { x: 6, y: 90, w: 38, r: 3, z: 10 },
  { x: 40, y: 94, w: 30, r: -2, z: 11 },
  { x: 64, y: 88, w: 36, r: 2.5, z: 10 },
];
const COLLAGE_CHUNK = 118; // how far down (in % of width) each set of twelve repeats
const COLLAGE_MOBILE = (i: number) => ({ x: i % 2 ? 38 : 0, y: i * 34, w: 62, r: i % 2 ? 2.5 : -2.5 });
/** Sizes the collage box to its lowest photo (photos have different shapes, so CSS can't know). */
function useCollageHeight(deps: unknown[]) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const top = el.getBoundingClientRect().top;
      let max = 0;
      el.querySelectorAll<HTMLElement>('.lightbox__piece').forEach((li) => {
        // Portrait photos take a narrower slot, so they don't tower over their neighbours
        const img = li.querySelector('img');
        if (img && img.naturalWidth) li.classList.toggle('is-tall', img.naturalHeight > img.naturalWidth * 1.1);
        max = Math.max(max, li.getBoundingClientRect().bottom - top);
      });
      el.style.height = `${Math.ceil(max + 8)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    el.querySelectorAll('img').forEach((img) => img.addEventListener('load', fit, { once: true }));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

function collageStyle(i: number): CSSProperties {
  const s = COLLAGE_SLOTS[i % COLLAGE_SLOTS.length];
  const m = COLLAGE_MOBILE(i);
  return {
    '--x': s.x, '--y': s.y + Math.floor(i / COLLAGE_SLOTS.length) * COLLAGE_CHUNK, '--w': s.w, '--r': `${s.r}deg`, '--z': s.z,
    '--mx': m.x, '--my': m.y, '--mw': m.w, '--mr': `${m.r}deg`, '--mz': i + 1,
  } as CSSProperties;
}

import { CreativeTimeline } from '../components/CreativeTimeline';
import { creativeFacts, creativeIntro, creativeWork, press, pressIntro } from '../content/creative';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { SocialIcon } from '../components/SocialIcon';
import { Reveal } from '../components/Reveal';
import { VideoEmbed } from '../components/VideoEmbed';
import { RichText } from '../components/RichText';

/**
 * Dihzahyners: the urban art initiative Jubran founded and led.
 * Same page anatomy as Work (title, filters, grid) so it feels like part of the site,
 * with a masonry layout and a lightbox to suit visual pieces rather than case studies.
 */
export default function Dihzahyners() {
  const c = creativeIntro;
  useDocumentMeta(c.title, 'Dihzahyners: the urban art initiative founded and led by Jubran Elias, revitalising public spaces through outdoor painting.');
  const list = creativeWork;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="page-hero dz-hero">
        <div className="container dz-hero__grid">
          <div className="dz-hero__lead">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="page-hero__title">
            <SplitText as="span" text={c.title} />
          </h1>
          <Reveal as="p" className="page-hero__intro">{c.intro}</Reveal>
          <Reveal as="ul" className="dz-icons" aria-label="Dihzahyners online">
            {[
              ['website', 'Website', 'https://cargocollective.com/dihzahyners'],
              ['facebook', 'Facebook', 'https://www.facebook.com/Dihzahyners/'],
              ['instagram', 'Instagram', 'https://www.instagram.com/dihzahyners/'],
              ['vimeo', 'Vimeo', 'https://vimeo.com/dihzahyners'],
              ['linkedin', 'LinkedIn', 'https://www.linkedin.com/company/dihzahyners'],
            ].map(([icon, label, href]) => (
              <li key={icon}>
                <a className="dz-icon" href={href} target="_blank" rel="noreferrer" aria-label={`Dihzahyners on ${label}`} title={label}>
                  <SocialIcon name={icon} />
                </a>
              </li>
            ))}
          </Reveal>
          </div>
          <Reveal as="dl" className="dz-facts">
            {creativeFacts.map((f) => (
              <div key={f.label} className="dz-facts__item">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-s" aria-label="Projects">
        <div className="container">
          <h2 className="visually-hidden">Projects by year</h2>
          <CreativeTimeline pieces={creativeWork} />
        </div>
      </section>

      <Press />

      <Lightbox items={list} index={open} onIndex={setOpen} />
    </>
  );
}

/** Accessible lightbox on the native <dialog>: Esc closes, arrow keys browse, focus returns on close. */
function Lightbox({ items, index, onIndex }: { items: typeof creativeWork; index: number | null; onIndex: (i: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const collageRef = useCollageHeight([index]);
  const p = index !== null ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onIndex]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={p?.title ?? 'Project'}
      onClose={() => onIndex(null)}
      onClick={(e) => e.target === ref.current && onIndex(null)} // click on the backdrop closes
    >
      {p && (
        <figure className="lightbox__figure">
          {p.video ? (
            <VideoEmbed key={p.id} provider={p.video.provider} id={p.video.id} url={p.video.url} title={p.title} poster={p.image} />
          ) : (
            <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
          )}
          <figcaption className="lightbox__caption">
            <div>
              <p className="lightbox__title">{p.title}</p>
              <p className="lightbox__meta">
                {p.year ? `${p.medium} · ${p.year}` : p.medium}
              </p>
            </div>
            <div className="lightbox__body">
              {p.description.map((para, i) => (
                <p key={i} className="lightbox__note">
                  <RichText text={para} />
                </p>
              ))}
              {p.partners && (
                <div className="lightbox__partners">
                  <p className="lightbox__label">With</p>
                  <ul>
                    {p.partners.map((name) => (
                      <li key={name}>
                        <RichText text={name} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.credits && (
                <dl className="lightbox__credits">
                  {p.credits.map(([role, name]) => (
                    <div key={role}>
                      <dt>{role}</dt>
                      <dd>{name}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {p.tags && <p className="lightbox__tags">{p.tags.join(' ')}</p>}
            </div>
          </figcaption>
          {p.photos && (
            <ul ref={collageRef} className="lightbox__photos lightbox__collage" aria-label={`Photos from ${p.title}`}>
              {p.photos.map((ph, i) => (
                <li key={ph.src} className="lightbox__piece" style={collageStyle(i)}>
                  <figure className="lightbox__photo">
                    <img src={ph.src} alt={ph.alt} loading="lazy" />
                    <figcaption className="lightbox__photo-tag">
                      <span className="lightbox__photo-no">{String(i + 1).padStart(2, '0')}</span>
                      {ph.title && <span className="lightbox__photo-title">{ph.title}</span>}
                      {ph.credit && (
                        <span className="lightbox__photo-credit">
                          <RichText text={ph.credit} />
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </figure>
      )}
      <div className="lightbox__controls">
        {items.length > 1 && (
          <>
            <button className="lightbox__btn" onClick={() => index !== null && onIndex((index - 1 + items.length) % items.length)} aria-label="Previous project">
              ←
            </button>
            <span className="lightbox__count" aria-live="polite">
              {index !== null ? index + 1 : 0} / {items.length}
            </span>
            <button className="lightbox__btn" onClick={() => index !== null && onIndex((index + 1) % items.length)} aria-label="Next project">
              →
            </button>
          </>
        )}
        <button className="lightbox__btn lightbox__close" onClick={() => onIndex(null)} aria-label="Close">
          ✕
        </button>
      </div>
    </dialog>
  );
}

/**
 * "In the press": compact. One line per year, with each outlet as a small link (the article's
 * title shows as a tooltip and to screen readers), so all 34 pieces fit in a short block.
 */
function Press() {
  const years = Array.from(new Set(press.map((p) => p.year))).sort((a, b) => (b ?? -1) - (a ?? -1));
  return (
    <section className="section-s dz-pressx" aria-labelledby="press-title">
      <div className="container dz-pressx__grid">
        <div className="dz-pressx__head">
          <h2 id="press-title" className="dz-pressx__title">{pressIntro.title}</h2>
          <p className="dz-pressx__intro muted">
            <span className="dz-pressx__count">{press.length}</span> articles and features in international and regional media.
          </p>
        </div>
        <dl className="dz-pressx__years">
          {years.map((y) => (
            <div key={String(y)} className="dz-pressx__row">
              <dt className="dz-pressx__year">{y ?? 'Undated'}</dt>
              <dd className="dz-pressx__links">
                {press
                  .filter((p) => p.year === y)
                  .map((p) => (
                    <a
                      key={p.url + p.title}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dz-pressx__link"
                      title={p.title}
                      aria-label={`${p.outlet}: ${p.title}${p.year ? `, ${p.year}` : ''} (opens in a new tab)`}
                    >
                      {p.outlet}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
