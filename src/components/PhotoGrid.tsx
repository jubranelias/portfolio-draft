/**
 * Noticed: an editorial photo grid with a lightbox.
 * - Desktop: a 12-column grid whose row unit equals the column width, so wide photos take 8×5 cells,
 *   portraits 4×8 and small ones 4×4; dense auto-placement fills the gaps into a loose, editorial rhythm.
 * - Phones: the same photos on 4 columns (wide 4×3, tall 2×4, small 2×2), no sideways scrolling.
 * - Click or tap opens the photo full-size in a lightbox: arrow keys, swipe, Escape or a tap outside.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Photo } from '../content/noticed';
import { useSmallImages } from '../hooks/useSmallImages';

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const small = useSmallImages();
  // the small variant is keyed by the photo's file name (without the hash Vite adds)
  const smallFor = (src: string) => {
    const name = src.split('/').pop()?.replace(/-[\w-]{8}\.webp$/, '').replace(/\.webp$/, '') ?? '';
    return small?.photos[name];
  };

  const show = useCallback((i: number) => setOpen(((i % photos.length) + photos.length) % photos.length), [photos.length]);
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(open + 1);
      if (e.key === 'ArrowLeft') show(open - 1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, show]);

  const cur = open === null ? null : photos[open];

  return (
    <>
      <ul className="pg" aria-label="Photos">
        {photos.map((p, i) => (
          <li key={p.src} className={`pg__item pg__item--${p.size}`}>
            <button
              type="button"
              className="pg__btn"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                show(i);
              }}
              aria-label={`${p.alt}. Open full size`}
            >
              <img
                src={p.src}
                srcSet={smallFor(p.src) ? `${smallFor(p.src)} 640w, ${p.src} ${p.w}w` : undefined}
                sizes="(max-width: 760px) 50vw, 33vw"
                width={p.w}
                height={p.h}
                alt=""
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
              {p.caption && (
                <span className="pg__cap" aria-hidden="true">
                  {p.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {cur &&
        createPortal(
          <div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={cur.caption ? `${cur.caption}` : 'Photo'}
            onClick={(e) => e.target === e.currentTarget && close()}
            onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
            onTouchEnd={(e) => {
              const t = touch.current;
              touch.current = null;
              if (!t || open === null) return;
              const dx = e.changedTouches[0].clientX - t.x;
              const dy = e.changedTouches[0].clientY - t.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(open + (dx < 0 ? 1 : -1));
            }}
          >
            <button ref={closeBtn} type="button" className="lb__close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <button type="button" className="lb__nav lb__nav--prev" onClick={() => open !== null && show(open - 1)} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <figure className="lb__fig" key={cur.src}>
              <img src={cur.src} width={cur.w} height={cur.h} alt={cur.alt} />
              <figcaption className="lb__cap">
                {cur.caption && <span>{cur.caption}</span>}
                <span className="lb__count">
                  {(open ?? 0) + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
            <button type="button" className="lb__nav lb__nav--next" onClick={() => open !== null && show(open + 1)} aria-label="Next photo">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
