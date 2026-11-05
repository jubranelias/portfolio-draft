import { site } from '../config/site';
import { diaryIntro } from '../content/diary';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { InstagramEmbed } from '../components/InstagramEmbed';

/**
 * Noticed: the visual diary. The photos live on Instagram (@jubranelias), so the page shows the
 * profile's latest posts there, with the intro and a follow link around it.
 */
/** The diary now lives on Instagram; the page shows the profile there. */
const INSTAGRAM_HANDLE = 'jubranelias';

export default function Noticed() {
  const c = diaryIntro;
  useDocumentMeta(c.title, 'Noticed: a visual diary by Jubran Elias of everyday moments, travels, exhibitions and places.');
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

      <section className="section-s" aria-label="Instagram">
        <div className="container">
          <InstagramEmbed handle={INSTAGRAM_HANDLE} />
        </div>
      </section>


    </>
  );
}

/** Full-size view on the native <dialog>: Esc closes, arrow keys browse, focus returns on close. */
