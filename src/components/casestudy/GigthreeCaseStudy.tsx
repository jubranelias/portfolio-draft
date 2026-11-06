/**
 * gigthree: UI design case study (Jubran designed the interface; no research phase). Copy is verbatim from the Figma frame "Gigthree — Full Case Study"
 * (Projects file, node 3642:193); presentation follows the site's design (shared parts).
 * Screen slots show a quiet placeholder until real screens are added (see `src` on each shot).
 */
import { Fragment } from 'react';
import { CaseHero, Chip, Lead, Overview, Points, Section, Shots, SubHead } from './parts';
import siteHero from '../../assets/images/gigthree/site-hero.webp';
import sitePages from '../../assets/images/gigthree/site-pages.webp';
import platformScreens from '../../assets/images/gigthree/platform-screens.webp';
import howItWorks from '../../assets/images/gigthree/how-it-works.webp';
import dsColorType from '../../assets/images/gigthree/ds-color-type.webp';
import dsComponents from '../../assets/images/gigthree/ds-components.webp';

function Steps({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div className="hs-flowrow">
      <p className="hs-sublabel">{label}</p>
      <div className="hs-flow">
        {steps.map((s, i) => (
          <Fragment key={s}>
            {i > 0 && <span className="hs-flow__arrow" aria-hidden="true">→</span>}
            <Chip solid={i === steps.length - 1}>{s}</Chip>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function GigthreeCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study" title="Gigthree: Executive & Professional Gigs, On-Demand" />

      <Section n="01" label="" title="Overview" id="g3-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Client', 'Gigthree, Lebanon'],
            ['Platform', 'Responsive web'],
            ['Year', '2019'],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context" id="g3-context">
        <Lead>Gigthree brings the gig-economy model to senior professional work: vetted executives and experts, on demand.</Lead>
        <Points
          items={[
            'For companies, hiring executive expertise is slow, expensive and network-driven.',
            'For experts, there was no credible way to sell their expertise flexibly without diluting their brand.',
            'I designed the interface of the responsive site and platform for both audiences at once.',
          ]}
        />
        <div className="hs-hmw">
          <p className="hs-hmw__label">How might we</p>
          <p className="hs-hmw__text">…make hiring a vetted executive as fast as posting a gig, without making it feel like one?</p>
        </div>
      </Section>

      <Section n="03" label="" title="Decisions" id="g3-exploration">
        <Lead>Trust comes before the first match: experts pass a four-step vetting flow before they can apply to anything.</Lead>
        <Steps label="Expert vetting flow" steps={['Apply to join', 'First interview', 'Technical interview', 'Start applying to gigs']} />
        <Steps label="Client" steps={['Post gig', 'Review applicants', 'Interview', 'Hire']} />
        <Shots items={[{ title: 'How it works, on the site', caption: 'The four-step vetting flow as experts see it', src: howItWorks, alt: 'The “How it works” section with four step cards' }]} />
        <Lead>Between a marketplace grid, which felt fast but cheap, and an editorial look, which felt credible but slow, I landed in the middle: marketplace efficiency in an executive-grade visual language.</Lead>
        <SubHead>Key decisions</SubHead>
        <div>
          {[
            ['Executive-grade profiles', 'Track record and outcomes lead; rates and availability come second. A profile reads like a bio, not a listing.'],
            ['Vetting made visible', 'A verification badge on every card, profile and match keeps the platform’s core promise in view.'],
            ['Structured gig posting', 'Companies post scoped briefs through a guided form, not free-text jobs, so matching stays sharp.'],
          ].map(([t, d], i) => (
            <div className="hs-decision" key={t}>
              <span className="hs-decision__n">{i + 1}</span>
              <div className="hs-decision__body">
                <h3 className="hs-decision__title">{t}</h3>
                <p className="hs-insight__text">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <SubHead>The design system</SubHead>
        <Lead>Poppins throughout, deep navy with a single red accent, and a small set of components shared by the site and the platform.</Lead>
        <Shots
          items={[
            { title: 'Colour & typography', caption: 'Navy and neutral scales, semantic tokens, crimson and cyan accents; a Poppins type ramp from display to caption', src: dsColorType, alt: 'The Gigthree design system: colour scales, semantic tokens, accents and the typography ramp' },
            { title: 'Spacing, radius & components', caption: 'Spacing and radius scales, inputs with helper and error states, button styles, avatars, chips and the vetted expert card', src: dsComponents, alt: 'The Gigthree design system: spacing and radius scales, inputs, buttons, avatars, chips and an expert profile card' },
          ]}
        />
      </Section>

      <Section n="04" label="" title="Solution" id="g3-solution">
        <Lead>A marketing site with three ways in, sign-up with LinkedIn or Google, a guided profile builder, gig discovery, a community hub and a C-suite network.</Lead>
        <Shots
          items={[
            { title: 'The marketing site', caption: '“The future of work: right here, right now”. Hire an expert, or join as one', src: siteHero, alt: 'The Gigthree home page on a laptop and tablet' },
            { title: 'The platform', caption: 'Join flow, expert profile with a completeness meter, Find gigs and My gigs, community hub', src: platformScreens, alt: 'A spread of Gigthree platform screens' },
            { title: 'Site pages', caption: 'The C-suite network, how it works, what experts say, and contact', src: sitePages, alt: 'Several pages of the Gigthree site' },
          ]}
        />
      </Section>
    </div>
  );
}
