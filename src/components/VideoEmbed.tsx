import { useEffect, useState } from 'react';

/**
 * A Vimeo or YouTube video that loads only when asked: it shows the project's cover with a
 * play button, and swaps in the player on click (so the page stays fast and nothing from
 * Vimeo or YouTube loads until a visitor wants to watch). Both use their privacy modes:
 * Vimeo's do-not-track, and YouTube's youtube-nocookie.com player.
 *
 * Some places don't allow embedded players (for example a preview host with a strict
 * content-security policy). The browser reports that as a "securitypolicyviolation";
 * when it happens, the player is swapped for a clear notice, and every play button on
 * the page opens the film on Vimeo or YouTube in a new tab instead.
 */
let embedsBlocked = false;
const listeners = new Set<() => void>();

function useEmbedsBlocked() {
  const [blocked, setBlocked] = useState(embedsBlocked);
  useEffect(() => {
    const update = () => setBlocked(true);
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);
  return blocked;
}

if (typeof document !== 'undefined') {
  document.addEventListener('securitypolicyviolation', (e) => {
    if (!embedsBlocked && /vimeo\.com|youtube(-nocookie)?\.com/.test(e.blockedURI)) {
      embedsBlocked = true;
      listeners.forEach((fn) => fn());
    }
  });
}

const PROVIDERS = {
  vimeo: { name: 'Vimeo', src: (id: string) => `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0` },
  youtube: { name: 'YouTube', src: (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` },
};

export function VideoEmbed({
  provider,
  id,
  url,
  title,
  poster,
  remotePoster,
}: {
  provider: keyof typeof PROVIDERS;
  id: string;
  url: string;
  title: string;
  poster: string;
  /** The platform's thumbnail URL (tried first; may be blocked on some pages) */
  remotePoster?: string;
}) {
  const P = PROVIDERS[provider];
  const [playing, setPlaying] = useState(false);
  const blocked = useEmbedsBlocked();

  // Poster order: our own image, then the video platform's thumbnail, then a title card
  const posters = [poster, remotePoster].filter(Boolean) as string[];
  const [posterStep, setPosterStep] = useState(0);
  const posterSrc = posters[posterStep];

  const play = () => {
    if (blocked) window.open(url, '_blank', 'noopener');
    else setPlaying(true);
  };

  return (
    <div className="vimeo">
      <div className="vimeo__frame">
        {playing && !blocked ? (
          <iframe
            src={P.src(id)}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            // YouTube's player refuses to play (error 153) without the page's origin as referrer
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button className="vimeo__poster" onClick={play} aria-label={blocked ? `Watch ${title} on ${P.name} (opens in a new tab)` : `Play video: ${title}`}>
            {posterSrc ? (
              <img src={posterSrc} alt="" onError={() => setPosterStep((n) => n + 1)} />
            ) : (
              <span className="vimeo__titlecard" aria-hidden="true">
                <span>{title}</span>
              </span>
            )}
            <span className="vimeo__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
            </span>
            {blocked && (
              <span className="vimeo__notice">
                The player can’t load on this page. Press play to watch on {P.name}.
              </span>
            )}
          </button>
        )}
      </div>
      <a className="vimeo__link" href={url} target="_blank" rel="noopener noreferrer">
        Watch on {P.name} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
