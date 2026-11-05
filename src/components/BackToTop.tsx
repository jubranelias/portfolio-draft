/**
 * A small floating "Back to top" button, bottom-right. It only appears once the visitor has
 * scrolled a good way down (more than ~1.5 screens), fades out again near the top, and scrolls
 * smoothly to the top (instantly with reduced motion), handing keyboard focus to the content.
 */
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setShow(window.scrollY > window.innerHeight * 1.5);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button type="button" className={`totop ${show ? 'is-shown' : ''}`} onClick={go} aria-label="Back to top" title="Back to top" tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
