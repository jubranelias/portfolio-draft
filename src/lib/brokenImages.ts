/**
 * When an image fails to load, replace it with a neutral tile that says "Image unavailable",
 * keeping the layout and caption, instead of the browser's broken-image icon.
 */
const TILE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e7e2d9"/><g fill="none" stroke="#8b857c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="150" y="112" width="100" height="76" rx="8"/><circle cx="178" cy="136" r="8"/><path d="M152 182l34-30 26 22 18-14 20 22"/></g><text x="200" y="222" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" fill="#5e5950">Image unavailable</text></svg>',
)}`;

export function watchBrokenImages() {
  const onError = (e: Event) => {
    const img = e.target as HTMLImageElement | null;
    if (!img || img.tagName !== 'IMG' || img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = TILE;
    img.classList.add('is-broken');
  };
  document.addEventListener('error', onError, true);
  return () => document.removeEventListener('error', onError, true);
}
