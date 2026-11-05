import { useEffect } from 'react';
import { site } from '../config/site';

/** Sets <title> and meta description for the current page. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.brand.seoTitle}` : `${site.brand.seoTitle}, Product Designer`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description ?? site.brand.seoDescription;
  }, [title, description]);
}
