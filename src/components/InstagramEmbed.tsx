/**
 * Jubran's Instagram profile, embedded with Instagram's own profile embed (latest posts).
 * Pages that block content from other sites (like the claude.ai preview) can't load it;
 * that's detected and a clear "View on Instagram" card is shown instead.
 */
import { useEffect, useState } from 'react';

export function InstagramEmbed({ handle }: { handle: string }) {
  const url = `https://www.instagram.com/${handle}/`;
  const [blocked, setBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onBlock = (e: SecurityPolicyViolationEvent) => {
      if (/instagram\.com/.test(e.blockedURI)) setBlocked(true);
    };
    document.addEventListener('securitypolicyviolation', onBlock);
    // If nothing has loaded after a while, show the card too
    const t = setTimeout(() => setBlocked((b) => b || !loaded), 6000);
    return () => {
      document.removeEventListener('securitypolicyviolation', onBlock);
      clearTimeout(t);
    };
  }, [loaded]);

  if (blocked) {
    return (
      <a className="ig-card" href={url} target="_blank" rel="noopener noreferrer">
        <span className="ig-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="ig-card__text">
          <strong>@{handle}</strong>
          <span>The visual diary lives on Instagram. View the latest posts there.</span>
        </span>
        <span className="ig-card__go">
          View on Instagram <span aria-hidden="true">↗</span>
        </span>
      </a>
    );
  }

  return (
    <div className="ig-embed">
      <iframe
        title={`Latest posts from @${handle} on Instagram`}
        src={`${url}embed`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
