/** Smooth-scrolls to an element id. Works with both hash and browser routing. */
export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}
