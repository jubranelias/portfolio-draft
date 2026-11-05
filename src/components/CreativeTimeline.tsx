/**
 * Dihzahyners timeline. Only years with something in them appear, as evenly spaced stops along
 * one line: founded (2012), the project years, the move to online only (2020), and today.
 * Each project is a marker; hovering shows its name in a fixed caption row (so nothing shifts),
 * selecting reveals its photo, title and summary below. Arrow keys move between projects.
 * On phones the stops stack vertically with their projects listed under each year.
 */
import { KeyboardEvent, useMemo, useRef, useState } from 'react';
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
  // Stops: every year that has a project or a milestone, in order, plus today
  const stops = useMemo(() => {
    const ys = new Set<number>([FOUNDED.year, ONLINE.year, ...items.map((p) => p.y)]);
    return [...ys].sort((a, b) => a - b);
  }, [items]);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [hoverNote, setHoverNote] = useState<string | null>(null);
  const [shown, setShown] = useState(0);
  const markers = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    setShown((s) => s + 1);
  };
  const onKey = (e: KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = (active + dir + items.length) % items.length;
    select(next);
    markers.current[next]?.focus();
  };

  const cur = items[active];
  if (!cur) return null;
  const captionFor = hover ?? active;
  const cap = items[captionFor];
  let k = 0; // running marker index across stops

  return (
    <div className="tl" onKeyDown={onKey}>
      <div className="tl__track" role="tablist" aria-label="Projects by year">
        {/* Fixed-height caption row: the hovered (or selected) project's name, never moving the layout */}
        <p className="tl__caption" aria-hidden="true">
          {hoverNote ? (
            <span key={hoverNote} className="tl__caption-text tl__caption-text--note">{hoverNote}</span>
          ) : (
            <span key={captionFor} className="tl__caption-text">
              <span className="tl__caption-year">{cap.year}</span>
              {cap.title}
            </span>
          )}
        </p>
        <div className="tl__stops">
          {stops.map((y) => {
            const inYear = items.filter((p) => p.y === y);
            const isActiveYear = y === cur.y;
            const milestone = y === FOUNDED.year ? FOUNDED : y === ONLINE.year ? ONLINE : null;
            return (
              <div key={y} className={`tl__stop ${isActiveYear ? 'is-active' : ''} ${milestone ? 'tl__stop--milestone' : ''}`}>
                <div className="tl__dots">
                  {milestone && (
                    <span
                      className="tl__flag"
                      role="img"
                      aria-label={milestone.detail}
                      tabIndex={0}
                      onPointerEnter={() => setHoverNote(milestone.detail)}
                      onPointerLeave={() => setHoverNote(null)}
                      onFocus={() => setHoverNote(milestone.detail)}
                      onBlur={() => setHoverNote(null)}
                    >
                      {milestone === FOUNDED ? (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                          <path d="M5 21V3h11l-2 4 2 4H7v10z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                          <path d="M9 7v10M15 7v10" />
                        </svg>
                      )}
                    </span>
                  )}
                  {inYear.map((p) => {
                    const i = k++;
                    return (
                      <button
                        key={p.id}
                        ref={(el) => (markers.current[i] = el)}
                        role="tab"
                        aria-selected={i === active}
                        aria-controls="tl-panel"
                        aria-label={`${p.title}, ${p.year}`}
                        tabIndex={i === active ? 0 : -1}
                        className={`tl__marker ${i === active ? 'is-active' : ''}`}
                        onClick={() => select(i)}
                        onPointerEnter={() => setHover(i)}
                        onPointerLeave={() => setHover(null)}
                        onFocus={() => setHover(i)}
                        onBlur={() => setHover(null)}
                      >
                        <span className="tl__dot" />
                      </button>
                    );
                  })}
                </div>
                <span className="tl__year">{y}</span>
                {/* Phones: the project names under the year, tappable */}
                <ul className="tl__list" aria-hidden="true">
                  {inYear.map((p) => {
                    const i = items.indexOf(p);
                    return (
                      <li key={p.id}>
                        <button type="button" className={`tl__list-item ${i === active ? 'is-active' : ''}`} tabIndex={-1} onClick={() => select(i)}>
                          {p.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {milestone && <span className="tl__note">{milestone.label}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="tl__panel" id="tl-panel" role="tabpanel" key={shown}>
        {/* One main visual per project: its film if it has one, otherwise its photo */}
        <div className={`tl__media ${cur.fit ? 'tl__media--contain' : ''}`} style={cur.fit ? { background: cur.fit.background } : undefined}>
          {cur.video ? (
            <VideoEmbed key={cur.id} provider={cur.video.provider} id={cur.video.id} url={cur.video.url} title={cur.title} poster={cur.placeholderImage ? '' : cur.image} remotePoster={cur.video.thumb} />
          ) : cur.image ? (
            <img src={cur.image} alt={cur.alt} />
          ) : (
            // entries without a photo yet (the talks): a quiet typographic card
            <div className="tl__type" role="img" aria-label={cur.alt}>
              <span className="tl__type-kicker">{cur.medium}</span>
              <span className="tl__type-name">{cur.title.replace(/ talk$/i, '')}</span>
              <span className="tl__type-place">{cur.place ? `${cur.place} · ${cur.year}` : cur.year}</span>
            </div>
          )}
        </div>
        <div className="tl__body">
          <p className="tl__meta">
            <span className="tl__meta-year">{cur.year}</span>
            <span>{cur.medium}</span>
          </p>
          <h3 className="tl__title">{cur.title}</h3>
          {cur.summary && (
            <p className="tl__summary">
              <RichText text={cur.summary} />
            </p>
          )}
          {!cur.volumes &&
            (cur.video && cur.album && cur.album !== cur.video.url ? (
              <div className="tl__links">
                <a className="tl__open" href={cur.video.url} target="_blank" rel="noreferrer">
                  Watch on {cur.video.provider === 'youtube' ? 'YouTube' : 'Vimeo'} <span aria-hidden="true">↗</span>
                </a>
                <a className="tl__open" href={cur.album} target="_blank" rel="noreferrer">
                  Facebook album <span aria-hidden="true">↗</span>
                </a>
              </div>
            ) : (
              <a className="tl__open" href={cur.album ?? DIHZAHYNERS_FACEBOOK} target="_blank" rel="noreferrer">
                Open project <span aria-hidden="true">↗</span>
              </a>
            ))}
          <p className="tl__count muted">
            {active + 1} of {items.length}
          </p>
        </div>
        {cur.volumes && (
          <ul className="tl__volumes" aria-label="Volumes">
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
  );
}
