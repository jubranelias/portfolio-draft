/**
 * A small dismissible banner that appears when the browser loses its connection. The site itself
 * keeps working offline (it is one bundle); only external images and videos may not load.
 */
import { useEffect, useState } from 'react';

export function OfflineBanner() {
  const [offline, setOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const off = () => { setOffline(true); setDismissed(false); };
    const on = () => setOffline(false);
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => { window.removeEventListener('offline', off); window.removeEventListener('online', on); };
  }, []);
  if (!offline || dismissed) return null;
  return (
    <div className="offline" role="status" aria-live="polite">
      <span className="offline__dot" aria-hidden="true" />
      You’re offline. Some images and videos may not load until you’re back online.
      <button type="button" className="offline__close" onClick={() => setDismissed(true)} aria-label="Dismiss">×</button>
    </div>
  );
}
