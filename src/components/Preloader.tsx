/**
 * Intro preloader, coded from Jubran's intro animation:
 * the screen starts black; Jubran walks in from the left, pushing the black wall
 * across the screen to reveal a white page; as he pushes it off the right edge, his
 * wordmark (Wordmark.tsx) rises in letter by letter. Then the white page lifts away
 * on a curved edge to reveal the site.
 *
 * - The wall's position follows real loading (fonts and the page), never faster than
 *   PRELOADER.minDuration, never stuck past PRELOADER.maxDuration.
 * - His steps are driven by how far the wall has moved, so his feet never slide,
 *   whatever the loading speed. The drawn frames are one sprite sheet
 *   (src/assets/images/preloader-push.webp, 12 frames of his push cycle).
 *
 * Plays on every page load. Visitors who prefer reduced motion get a calm version:
 * no wall and no walking, just the name fading in, a pause, and a fade out.
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { finishPreloader } from '../lib/preloader';
import { Wordmark } from './Wordmark';
import { PreloaderLogo } from './PreloaderLogo';
import { preloaderVariant } from '../lib/preloader';
import pushSheet from '../assets/images/preloader-push.webp';

export const PRELOADER = {
  /** The wall never crosses the screen faster than this (ms) */
  minDuration: 1700,
  /** Give up waiting for slow assets after this long (ms) */
  maxDuration: 2500,
  /** The wordmark rises in once the wall has travelled this far (0–1) */
  nameAt: 0.72,
  /** Pause on the wordmark before the exit begins (ms) */
  hold: 350,
  /** Page lift duration; keep in sync with .preloader--exit in components.css (ms) */
  exit: 700,
};

/** The push-cycle sprite: frame count, one frame's aspect, and stride length per cycle relative to his height. */
const SPRITE = { frames: 12, aspect: 297 / 415, stridePerHeight: 0.61 };

/** Real loading milestones, each worth a share of the journey. */
function trackLoading(report: (share: number) => void) {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
  const page = document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));
  const sprite = new Promise<void>((r) => {
    const img = new Image();
    img.onload = img.onerror = () => r();
    img.src = pushSheet;
  });
  fonts.then(() => report(35));
  page.then(() => report(35));
  sprite.then(() => report(30));
}

export function PreloaderPush() {
  const [show] = useState(() => document.documentElement.classList.contains('is-preloading'));
  const [calm] = useState(() => document.documentElement.classList.contains('is-preloading-calm'));
  const [phase, setPhase] = useState<'loading' | 'named' | 'done' | 'exit'>('loading');
  const [gone, setGone] = useState(false);
  const [pct, setPct] = useState(0);
  const wall = useRef<HTMLDivElement>(null);
  const pusher = useRef<HTMLDivElement>(null);
  const target = useRef(0);

  useEffect(() => {
    if (!show) return;
    trackLoading((share) => (target.current = Math.min(100, target.current + share)));
    const t0 = performance.now();
    let p = 0; // 0–1, how far across the wall has been pushed
    let lastPct = -1;
    let named = false;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - t0;
      const timeCap = elapsed / PRELOADER.minDuration;
      const goal = elapsed > PRELOADER.maxDuration ? 1 : Math.min(target.current / 100, calm ? 1 : timeCap);
      // Ease toward the goal: a steady push that slows slightly as it waits for loading
      p += calm ? goal - p : (goal - p) * 0.06;
      if (goal - p < 0.006) p = goal;

      const vw = window.innerWidth;
      const h = pusher.current?.offsetHeight ?? 400;
      const w = h * SPRITE.aspect;
      // The wall travels the full screen plus his width, so he pushes it right off the edge
      const x = p * (vw + w);
      if (wall.current) wall.current.style.transform = `translate3d(${x}px,0,0)`;
      if (pusher.current) {
        const stride = h * SPRITE.stridePerHeight;
        const frame = Math.floor((x / stride) * SPRITE.frames) % SPRITE.frames;
        pusher.current.style.backgroundPosition = `${(frame / (SPRITE.frames - 1)) * 100}% 0`;
      }

      const shown = Math.round(p * 100);
      if (shown !== lastPct) setPct((lastPct = shown));
      if (!named && (calm || p >= PRELOADER.nameAt)) {
        named = true;
        setPhase('named');
      }
      if (p >= 1) {
        setPhase('done');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, calm]);

  useEffect(() => {
    if (phase === 'done') {
      const id = setTimeout(() => {
        setPhase('exit');
        finishPreloader(); // the page underneath starts its own entrance as this lifts
      }, PRELOADER.hold);
      return () => clearTimeout(id);
    }
    if (phase === 'exit') {
      const id = setTimeout(() => setGone(true), PRELOADER.exit + 100);
      return () => clearTimeout(id);
    }
  }, [phase]);

  if (!show || gone) return null;

  return createPortal(
    <div className={`preloader preloader--${phase === 'done' ? 'named' : phase} ${calm ? 'preloader--calm' : ''}`} role="status" aria-live="polite" aria-label={`Loading, ${pct}%`}>
      <div className="preloader__panel">
        <div className="pl-name" aria-hidden="true">
          <Wordmark className="pl-wordmark" />
        </div>

        {/* The black wall, with Jubran pushing it from its left edge */}
        <div ref={wall} className="pl-wall">
          <div ref={pusher} className="pl-pusher" style={{ backgroundImage: `url(${pushSheet})` }} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Two intros to choose from:
 * 1. "Push": Jubran pushes a black wall off the screen (PreloaderPush, above).
 * 2. "Logo": the wordmark assembles from slices, a ribbon sweeps through it, and the
 *    letters flip to outlines and back (PreloaderLogo.tsx).
 * The default is site.preloader.variant; the comparison switch can override it per browser.
 */
export function Preloader() {
  const [variant] = useState(preloaderVariant);
  return variant === 2 ? <PreloaderLogo /> : <PreloaderPush />;
}
