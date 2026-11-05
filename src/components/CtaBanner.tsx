import { site } from '../config/site';
import { Button } from './Button';
import { SplitText } from './SplitText';

/** Full-width call to action with a slow-moving background image or optional video. */
export function CtaBanner() {
  const { kicker, title, button, note, image, video } = site.cta;
  return (
    <section className="section-s" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta">
          <div className="cta__bg" aria-hidden="true">
            {video ? (
              <video src={video} autoPlay muted loop playsInline poster={image} />
            ) : (
              <img src={image} alt="" loading="lazy" />
            )}
          </div>
          <div className="cta__content">
            <p className="cta__kicker">{kicker}</p>
            <SplitText id="cta-title" text={title} className="cta__title" />
            <div className="cta__row">
              <Button to={button.to} variant="light">{button.label}</Button>
              <p className="cta__note">{note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
