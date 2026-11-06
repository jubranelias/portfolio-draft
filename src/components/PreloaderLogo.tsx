/**
 * Intro preloader 2: Jubran's logo animation, played exactly as delivered.
 *
 * The film is src/assets/video/jubranelias-logo.webm / .mp4: the original animation, unchanged
 * in timing, motion and look; only the empty audio track was removed and it was re-encoded for
 * the web (WebM about 0.8 MB, MP4 about 1 MB; a browser loads just one). It plays muted and inline, full screen on a
 * background that matches the film's own off-white, so its edges never show.
 *
 * The page lifts away when the film ends (and the page has loaded). The video file is only
 * downloaded when this intro is the one being shown.
 * If a browser blocks autoplay (some battery-saver modes do), or the visitor prefers reduced
 * motion, the film's final frame is shown briefly instead.
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { finishPreloader } from '../lib/preloader';
import film from '../assets/video/jubranelias-logo.mp4';
import filmWebm from '../assets/video/jubranelias-logo.webm';
import endFrame from '../assets/video/jubranelias-logo-end.webp';

export const LOGO_INTRO = {
  /** Playback speed of the film: 1 = as delivered (10 s); 3 plays it in about 3.3 s */
  speed: 3,
  /** The Skip link appears after this long (ms) */
  skipAfter: 0,
  /** Never wait longer than this, whatever happens to the video (ms) */
  maxDuration: 4500,
  /** How long the final frame shows when the film can't play (ms) */
  stillDuration: 900,
  /** Page lift duration; keep in sync with .preloader--exit (ms) */
  exit: 700,
};

export function PreloaderLogo() {
  const [show] = useState(() => document.documentElement.classList.contains('is-preloading'));
  const [calm] = useState(() => document.documentElement.classList.contains('is-preloading-calm'));
  const [phase, setPhase] = useState<'play' | 'exit'>('play');
  const [still, setStill] = useState(calm);
  const [gone, setGone] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!show) return;
    let done = false;
    const timers: number[] = [];
    const page = document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));
    const leave = () => {
      if (done) return;
      done = true;
      page.then(() => {
        setPhase('exit');
        finishPreloader();
        timers.push(window.setTimeout(() => setGone(true), LOGO_INTRO.exit + 100));
      });
    };
    const showStill = () => {
      setStill(true);
      timers.push(window.setTimeout(leave, LOGO_INTRO.stillDuration));
    };

    timers.push(window.setTimeout(leave, LOGO_INTRO.maxDuration));
    const v = video.current;
    if (calm || !v) showStill();
    else {
      v.addEventListener('ended', leave, { once: true });
      v.addEventListener('error', showStill, { once: true });
      v.querySelector('source:last-child')?.addEventListener('error', showStill, { once: true });
      v.defaultPlaybackRate = LOGO_INTRO.speed;
      v.playbackRate = LOGO_INTRO.speed;
      v.play().catch(showStill);
    }
    skipRef.current = leave;
    return () => {
      done = true;
      timers.forEach(clearTimeout);
    };
  }, [show, calm]);

  if (!show || gone) return null;

  return createPortal(
    <div className={`preloader preloader--logo preloader--${phase}`} role="status" aria-label="Loading">
      <div className="preloader__panel">
        <div className="pl2" aria-hidden="true">
          {still ? (
            <img className="pl2__film" src={endFrame} alt="" />
          ) : (
            <video ref={video} className="pl2__film" muted playsInline preload="auto" disablePictureInPicture>
              {/* Each browser downloads only the first format it can play */}
              <source src={film} type="video/mp4" />
              <source src={filmWebm} type="video/webm" />
            </video>
          )}
        </div>
      </div>
      {phase === 'play' && (
        <button type="button" className="preloader__skip" style={{ animationDelay: `${LOGO_INTRO.skipAfter}ms` }} onClick={() => skipRef.current()}>
          Skip <span aria-hidden="true">→</span>
        </button>
      )}
    </div>,
    document.body,
  );
}
