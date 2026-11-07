import { useEffect, useState } from 'react';

type Small = { covers: Record<string, string>; photos: Record<string, string> };
let cache: Small | null = null;

/** The 640px image variants (for srcset), fetched once; empty in the single-file preview build. */
export function useSmallImages(): Small | null {
  const [s, setS] = useState<Small | null>(cache);
  useEffect(() => {
    if (cache || __HASH_ROUTER__) return;
    import('../content/small-images').then((m) => {
      cache = { covers: m.smallCovers, photos: m.smallPhotos };
      setS(cache);
    });
  }, []);
  return s;
}
