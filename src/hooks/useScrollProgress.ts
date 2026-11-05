import { RefObject, useEffect } from 'react';

/**
 * Writes the element's scroll progress (0 → 1) to a CSS custom property on the element.
 * mode 'through': 0 = element top meets viewport bottom, 1 = element bottom meets viewport top.
 * mode 'sticky':  0 = section top at viewport top, 1 = section bottom at viewport bottom
 *                 (use for tall sections with a sticky child).
 * Writing a CSS variable instead of React state keeps scroll effects off the render path.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  { variable = '--p', mode = 'through' }: { variable?: string; mode?: 'through' | 'sticky' } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty(variable, mode === 'sticky' ? '1' : '0.5');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = mode === 'sticky' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height);
      const v = Math.min(1, Math.max(0, p)).toFixed(4);
      // writing the same value still invalidates styles, so only write when it changes
      if (el.style.getPropertyValue(variable) !== v) el.style.setProperty(variable, v);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, variable, mode]);
}
