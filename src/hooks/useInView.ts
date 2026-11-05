import { useEffect, useRef, useState } from 'react';

/**
 * True once the element has entered the viewport (fires once).
 * Uses IntersectionObserver, plus a light fallback check on scroll, on resize and after the
 * intro lifts, so elements that start just below the fold (or whose position shifts while the
 * page settles) always appear.
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    let done = false;
    let raf = 0;
    const show = () => {
      if (done) return;
      done = true;
      setInView(true);
    };
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) show();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { rootMargin },
    );
    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('preloader:done', schedule);
    const late = window.setTimeout(schedule, 1200);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(late);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('preloader:done', schedule);
    };
  }, [inView, rootMargin]);

  return [ref, inView] as const;
}
