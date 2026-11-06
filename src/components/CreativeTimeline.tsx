/**
 * Dihzahyners projects, as a gallery you can scrub through.
 * - A row of years at the top acts as a scrubber: tap a year and the gallery glides to it; scroll the
 *   gallery and the year row follows.
 * - The gallery is one horizontal, snap-scrolling row of cards (swipe on touch, drag or arrows on
 *   desktop, arrow keys on a keyboard). The centred card is the active one; the others sit back a little.
 * - Below the gallery, the active project's details cross-fade in: year, type, title, summary, links,
 *   and the volumes for Paint Up Volumes.
 * Milestones (founded 2012, online only from 2020) sit quietly at the ends of the year row.
 * Everything is one layout on every screen size, so nothing has to be scrolled past to reach a project.
 */
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { CreativePiece, DIHZAHYNERS_FACEBOOK } from '../content/creative';
import { VideoEmbed } from './VideoEmbed';
import { RichText } from './RichText';

const FOUNDED = { year: 2012, label: 'Founded', detail: 'Founded by Jubran Elias & Lana Chukri on 28 April 2012' };
const ONLINE = { year: 2020, label: 'Online only', detail: 'Moved to an online presence only, and all events paused after COVID-19' };

type Item = CreativePiece & { index: number; y: number };

export function CreativeTimeline({ pieces }: { pieces: CreativePiece[] }) {
  const items: Item[] = useMemo(
    () => pieces.map((p, index) => ({ ...p, index, y: Number(p.year) || 0 })).filter((p) => p.y > 0).sort((a, b) => a.y - b.y || a.index - b.index),
    [pieces],
  );
  const years = useMemo(() => [...new Set(items.map((p) => p.y))], [items]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const yearRow = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const cur = items[active];

  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // centre a card in the gallery
  const goTo = (i: number, smooth = true) => {
    const t = track.current;
    const c = cards.current[i];
    if (!t || !c) return;
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: smooth && !reduced() ? 'smooth' : 'auto' });
    setActive(i);
  };

  // scrolling the gallery (by hand) makes the centred card active
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mid = t.scrollLeft + t.clientWidth / 2;
        let best = 0;
        let bd = Infinity;
        cards.current.forEach((c, i) => {
          if (!c) return;
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      t.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keep the active year in view in the year row (without moving the page), and stop any video that scrolled away
  useEffect(() => {
    const row = yearRow.current;
    const on = row?.querySelector<HTMLElement>('.is-on');
    if (row && on) row.scrollTo({ left: on.offsetLeft - row.clientWidth / 2 + on.offsetWidth / 2, behavior: reduced() ? 'auto' : 'smooth' });
    if (playing && playing !== cur?.id) setPlaying(null);
  }, [active, cur?.id, playing]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = Math.max(0, Math.min(items.length - 1, active + (e.key === 'ArrowRight' ? 1 : -1)));
    goTo(next);
    cards.current[next]?.focus({ preventScroll: true });
  };

  if (!cur) return null;

  return (
    <div className="pu">
      {/* Years: a scrubber for the gallery */}
      <div className="pu__years" ref={yearRow} role="group" aria-label="Jump to a year">
        <span className="pu__milestone" title={FOUNDED.detail}>
          {FOUNDED.label} {FOUNDED.year}
        </span>
        {years.map((y) => (
          <button key={y} type="button" className={`pu__year${y === cur.y ? ' is-on' : ''}`} aria-pressed={y === cur.y} onClick={() => goTo(items.findIndex((p) => p.y === y))}>
            {y}
          </button>
        ))}
        <span className="pu__milestone" title={ONLINE.detail}>
          {ONLINE.label} {ONLINE.year}
        </span>
      </div>

      {/* The gallery */}
      <div className="pu__stage">
        <button type="button" className="pu__arrow pu__arrow--prev" aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div ref={track} className="pu__track" role="group" aria-roledescription="carousel" aria-label="Projects" onKeyDown={onKey}>
          {items.map((p, i) => {
            const on = i === active;
            return (
              <article
                key={p.id}
                ref={(el) => (cards.current[i] = el)}
                className={`pu__card${on ? ' is-on' : ''}`}
                tabIndex={on ? 0 : -1}
                aria-current={on ? 'true' : undefined}
                aria-label={`${p.title}, ${p.year}`}
                onClick={() => (on ? undefined : goTo(i))}
              >
                <div className={`pu__media${p.fit ? ' pu__media--contain' : ''}`} style={p.fit ? { background: p.fit.background } : undefined}>
                  {p.video && on && playing === p.id ? (
                    <VideoEmbed key={p.id} provider={p.video.provider} id={p.video.id} url={p.video.url} title={p.title} poster={p.placeholderImage ? '' : p.image} remotePoster={p.video.thumb} />
                  ) : p.image ? (
                    <img src={p.image} alt={on ? p.alt : ''} loading={Math.abs(i - active) < 3 ? 'eager' : 'lazy'} draggable={false} />
                  ) : (
                    <div className="pu__type" role="img" aria-label={p.alt}>
                      <span className="pu__type-kicker">{p.medium}</span>
                      <span className="pu__type-name">{p.title.replace(/ talk$/i, '')}</span>
                      <span className="pu__type-place">{p.place ? `${p.place} · ${p.year}` : p.year}</span>
                    </div>
                  )}
                  {p.video && on && playing !== p.id && (
                    <button type="button" className="pu__play" aria-label={`Play ${p.title}`} onClick={(e) => (e.stopPropagation(), setPlaying(p.id))}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}
                  <span className="pu__chip" aria-hidden="true">
                    {p.year}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        <button type="button" className="pu__arrow pu__arrow--next" aria-label="Next project" disabled={active === items.length - 1} onClick={() => goTo(active + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* The active project's details */}
      <div className="pu__details" aria-live="polite">
        <div key={cur.id} className="pu__detail">
          <p className="pu__meta">
            <span className="pu__meta-year">{cur.year}</span>
            <span>{cur.medium}</span>
            <span className="pu__count">
              {active + 1} / {items.length}
            </span>
          </p>
          <h3 className="pu__title">{cur.title}</h3>
          {cur.summary && (
            <p className="pu__summary">
              <RichText text={cur.summary} />
            </p>
          )}
          {!cur.volumes && (
            <div className="pu__links">
              {cur.video && cur.album && cur.album !== cur.video.url ? (
                <>
                  <a className="pu__link" href={cur.video.url} target="_blank" rel="noreferrer">
                    Watch on {cur.video.provider === 'youtube' ? 'YouTube' : 'Vimeo'} <span aria-hidden="true">↗</span>
                  </a>
                  <a className="pu__link" href={cur.album} target="_blank" rel="noreferrer">
                    Facebook album <span aria-hidden="true">↗</span>
                  </a>
                </>
              ) : (
                <a className="pu__link" href={cur.album ?? DIHZAHYNERS_FACEBOOK} target="_blank" rel="noreferrer">
                  Open project <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
          {cur.volumes && (
            <ul className="tl__volumes pu__volumes" aria-label="Volumes">
              {cur.volumes.map((v) => (
                <li key={v.name}>
                  <a className="tl__volume" href={v.album ?? cur.album ?? DIHZAHYNERS_FACEBOOK} target="_blank" rel="noreferrer">
                    <span className="tl__volume-media">
                      <img src={v.src} alt={v.alt} loading="lazy" />
                    </span>
                    <span className="tl__volume-n">{v.n}</span>
                    <span className="tl__volume-name">{v.name}</span>
                    <span className="tl__volume-open">
                      Album <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
