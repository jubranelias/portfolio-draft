import { site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { Button } from '../components/Button';
import { CopyEmail } from '../components/CopyEmail';
import { InterestIcon } from '../components/InterestIcon';
import { PlantSection } from '../components/forest/PlantSection';

export default function Contact() {
  const c = site.contactPage;
  useDocumentMeta(c.title, c.intro);
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container contact">
          <SplitText as="h1" text={c.title} className="page-hero__title" />
          <p className="page-hero__intro contact__intro">{c.intro} I reply within two working days.</p>
          <p className="contact__meta muted">
            <span className="fun__icon fun__icon--inline" aria-hidden="true">
              <InterestIcon name="globe" />
            </span>
            Based in {site.contact.address}
          </p>
          <div className="contact__actions">
            <Button href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Hello Jubran')}`}>Email me</Button>
            <CopyEmail email={site.contact.email} />
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="rule" aria-hidden="true" />
      </div>
      <PlantSection />
    </>
  );
}
