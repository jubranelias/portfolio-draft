/**
 * "Beyond the portfolio": confidential banking and brokerage experience, shown as two company
 * entries with a request-a-walkthrough action. No screens, no client data.
 */
import { experience } from '../content/experience';
import { site } from '../config/site';

const REQUEST = `mailto:${site.contact.email}?subject=${encodeURIComponent('Private walkthrough request')}&body=${encodeURIComponent(
  "Hi Jubran,\n\nI'd like to see your banking and brokerage work. A few details about me and the role:\n\n",
)}`;

export function ExperienceSection() {
  return (
    <section className="section xp-section" aria-labelledby="xp-title">
      <div className="container">
        <div className="xp-head">
          <p className="kicker">Beyond the portfolio</p>
          <h2 id="xp-title" className="xp-section__title">
            Banking &amp; brokerage, under NDA
          </h2>
          <p className="xp-section__intro">
            Nearly five years designing for online brokerage and digital banking. The work is confidential, so it isn’t shown here, but I’m happy to walk you through it privately.
          </p>
        </div>

        <div className="xp-cards">
          {experience.map((x) => (
            <article className="xp-card" key={x.company}>
              <header className="xp-card__head">
                <p className="xp-card__domain">{x.domain}</p>
                <h3 className="xp-card__company">{x.company}</h3>
                <p className="xp-card__role">{x.role}</p>
                <p className="xp-card__meta">
                  {x.place} · {x.dates}
                </p>
                {x.client && <p className="xp-card__client">Client: {x.client}</p>}
              </header>
              <div className="xp-card__story">
                {x.story.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <p className="xp-card__nda">
                <span className="xp-card__lock" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="10" rx="2.5" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>
                Confidential. Screens shared on request only.
              </p>
            </article>
          ))}
        </div>

        <p className="xp-request">
          <a className="text-link xp-request__link" href={REQUEST}>
            Request a private walkthrough <span aria-hidden="true">→</span>
          </a>
          <span className="xp-request__note">I can show you on a call or send a private file with sensitive details hidden.</span>
        </p>
      </div>
    </section>
  );
}
