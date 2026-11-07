/**
 * Say hello: the email address is the hero, one big link with a copy button, over a short line of facts,
 * then the "Plant something" guestbook.
 * On phones everything stacks in that order, with the email first among the details.
 */
import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SplitText } from '../components/SplitText';
import { CopyEmail } from '../components/CopyEmail';
import { InterestIcon } from '../components/InterestIcon';
import { PlantSection } from '../components/forest/PlantSection';

/** The local time in Limassol, refreshed every minute */
function useLocalTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Nicosia' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Contact() {
  const c = site.contactPage;
  const time = useLocalTime();
  useDocumentMeta(c.title, c.intro);
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container contact">
          <p className="kicker">{c.title}</p>
          <SplitText as="h1" text={c.intro} className="contact__headline" />
          {/* the email is the hero: one big link, a copy button beside it */}
          <div className="contact__emailrow">
            <a className="contact__bigmail" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Hello Jubran')}`}>
              <span className="contact__bigmail-text">{site.contact.email}</span>
              <span className="contact__bigmail-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <CopyEmail email={site.contact.email} compact />
          </div>
          <ul className="contact__facts" aria-label="Details">
            <li>
              <span className="fun__icon fun__icon--inline" aria-hidden="true">
                <InterestIcon name="globe" />
              </span>
              {site.contact.address} · {time} local
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PlantSection />
    </>
  );
}
