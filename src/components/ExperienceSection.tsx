/**
 * "Beyond the portfolio": confidential brokerage experience as one panel: the story and the
 * walkthrough button on the left, the role(s) on the right. No screens, no client data.
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
        {/* one panel: the story on the left, the roles and the walkthrough action on the right */}
        <div className="xp-panel">
          <div className="xp-panel__lead">
            <p className="kicker">Beyond the portfolio</p>
            <h2 id="xp-title" className="xp-section__title">
              Where I work now
            </h2>
          </div>

          <ul className="xp-roles" aria-label="Roles">
            {experience.map((x) => (
              <li className="xp-role" key={x.company}>
                <p className="xp-card__domain">{x.domain}</p>
                <h3 className="xp-card__company">{x.company}</h3>
                <p className="xp-card__role">{x.role}</p>
                <p className="xp-card__meta">
                  {x.place} · {x.dates}
                </p>
                {x.client && <p className="xp-card__client">Client: {x.client}</p>}
                {x.story.length > 0 && (
                  <div className="xp-card__story">
                    {x.story.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="xp-request">
              <a className="btn btn--solid" href={REQUEST}>
                <span className="btn__label">Request a private walkthrough</span>
              </a>
              </div>
        </div>
      </div>
    </section>
  );
}
