/**
 * Shared state for the intro preloader.
 * index.html turns the preloader on before the first paint by adding .is-preloading to <html>
 * (plus .is-preloading-calm for reduced motion). Animations elsewhere on the
 * page wait for it to finish.
 */
import { site } from '../config/site';

const EVENT = 'preloader:done';
/** Which intro plays: the site default (the comparison switch has been retired). */
export function preloaderVariant(): 1 | 2 {
  return site.preloader.variant;
}

let done = false;

export function preloaderDone() {
  return done || !document.documentElement.classList.contains('is-preloading');
}

export function finishPreloader() {
  done = true;
  try {
    sessionStorage.setItem('intro-played', '1'); // once per visit
  } catch {
    /* storage unavailable */
  }
  document.documentElement.classList.remove('is-preloading', 'is-preloading-calm', 'is-preloading-v2');
  window.dispatchEvent(new Event(EVENT));
}

export function onPreloaderDone(fn: () => void) {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
