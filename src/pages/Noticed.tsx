import { site } from '../config/site';
import { diaryIntro } from '../content/diary';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { PhotoGrid } from '../components/PhotoGrid';
import { photos } from '../content/noticed';

/**
 * Noticed: the visual diary. A curated, self-hosted photo grid (src/content/noticed.ts) gives a
 * glimpse of the photography; the rest lives on Instagram (@jubranelias), linked above and below.
 */

export default function Noticed() {
  const c = diaryIntro;
  useDocumentMeta(c.title, 'Diary: a visual diary by Jubran Elias. Places, moments and small details, mostly on the road and often from above.');
  const instagram = site.socials.find((s) => s.icon === 'instagram')?.href;

  return (
    <>
      <section className="page-hero noticed-hero">
        <div className="container">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="page-hero__title noticed-hero__title">
            <SplitText as="span" text={c.title} />
          </h1>
          <Reveal as="p" className="page-hero__intro">{c.intro}</Reveal>
          {instagram && (
            <div className="noticed-hero__cta">
              <Button href={instagram} variant="outline">{c.instagramLabel}</Button>
            </div>
          )}
        </div>
      </section>

      <section className="section-s noticed-grid" aria-label="Photos">
        <div className="container">
          <PhotoGrid photos={photos} />
          {instagram && (
            <div className="noticed-grid__more">
              <Button href={instagram}>More on Instagram</Button>
            </div>
          )}
        </div>
      </section>


    </>
  );
}

/** Full-size view on the native <dialog>: Esc closes, arrow keys browse, focus returns on close. */
