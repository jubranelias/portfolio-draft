/**
 * Light / dark theme.
 * The visitor's choice is stored in localStorage and applied as data-theme on <html>.
 * With no stored choice, the site follows the system setting (see tokens.css).
 */
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function getTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
  window.dispatchEvent(new Event('themechange'));
}

/** Calls fn whenever the effective theme changes (toggle or system setting). */
export function onThemeChange(fn: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener('change', fn);
  window.addEventListener('themechange', fn);
  return () => {
    mq.removeEventListener('change', fn);
    window.removeEventListener('themechange', fn);
  };
}

export function useTheme(): [Theme, () => void] {
  const [theme, set] = useState<Theme>(() => getTheme());
  useEffect(() => onThemeChange(() => set(getTheme())), []);
  return [theme, () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')];
}
