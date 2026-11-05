/**
 * Al Jomaih iConnect: Employee Intranet Redesign: full case study.
 * Condensed from the Figma frame "iConnect — Full Case Study" (Projects file, node 3762:9555):
 * every chapter opens with one bold line, then a few specifics, then the images (~600 words).
 */
import { Fragment } from 'react';
import { Body, CaseHero, Cards, Chip, Lead, Overview, Points, Section, Shots, SubHead } from './parts';
import icDsColors from '../../assets/images/iconnect/ds-colors.webp';
import icDsButtons from '../../assets/images/iconnect/ds-buttons.webp';
import icDsType from '../../assets/images/iconnect/ds-typography.webp';
import icDsCards1 from '../../assets/images/iconnect/ds-cards-1.webp';
import icDsLists from '../../assets/images/iconnect/ds-lists.webp';
import icDsWidgets from '../../assets/images/iconnect/ds-widgets.webp';
import icLegHome from '../../assets/images/iconnect/legacy-home.webp';
import icLegFolders from '../../assets/images/iconnect/legacy-folders.webp';
import icLegApps from '../../assets/images/iconnect/legacy-apps.webp';
import icLegLearning from '../../assets/images/iconnect/legacy-learning.webp';
import icLegSocial from '../../assets/images/iconnect/legacy-social.webp';
import icLegTouch from '../../assets/images/iconnect/legacy-touch.webp';
import icLegCompetencies from '../../assets/images/iconnect/legacy-competencies.webp';
import icLegLinks from '../../assets/images/iconnect/legacy-links.webp';
import icSitemap from '../../assets/images/iconnect/sitemap.webp';
import icWireframes from '../../assets/images/iconnect/wireframes.webp';
import icHome from '../../assets/images/iconnect/home.webp';
import icApplications from '../../assets/images/iconnect/applications.webp';
import icDocuments from '../../assets/images/iconnect/documents.webp';
import icLearning from '../../assets/images/iconnect/learning.webp';
import icProfile from '../../assets/images/iconnect/profile.webp';
import icCompetencies from '../../assets/images/iconnect/competencies.webp';
import icTour2 from '../../assets/images/iconnect/tour-2.webp';
import icTour3 from '../../assets/images/iconnect/tour-3.webp';
import icTour4 from '../../assets/images/iconnect/tour-4.webp';
import icTour5 from '../../assets/images/iconnect/tour-5.webp';
import icTour6 from '../../assets/images/iconnect/tour-6.webp';

const IA: [string, string[]][] = [
  ['Productivity', ['My Shared Folders', 'My Applications']],
  ['Learning & Talent', ['External Learning', 'My Talent Space']],
  ['Community', ['Getting Social', 'Employee in Touch']],
  ['Resources', ['Employee Handbook', 'ACD Competencies']],
  ['Utilities', ['User Profile', 'Help & Support']],
];

const LEGACY: [string, string][] = [
  ['Homepage', icLegHome],
  ['My Shared Folders', icLegFolders],
  ['My Applications', icLegApps],
  ['External Learning', icLegLearning],
  ['Getting Social', icLegSocial],
  ['Employee in Touch', icLegTouch],
  ['ACD Competencies', icLegCompetencies],
  ['Useful Links', icLegLinks],
];

export function IConnectCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study" title="Al Jomaih iConnect: Employee Intranet Redesign" />

      <Section n="01" label="" title="Overview" id="ic-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Client', 'Al Jomaih Consumer Division'],
            ['Platform', 'Desktop web'],
            ['Timeline & status', '2 months, handed off for implementation'],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context & Problem" id="ic-context">
        <Lead>iConnect is where every employee of ACD’s four companies starts the day, and no two of its pages worked the same way.</Lead>
        <Points
          items={[
            'The homepage gave its first screen to a leadership message and an unsorted row of shortcuts.',
            'Folders were round icons with no labels, counts or dates; apps were a cartoon tile grid with no grouping or search.',
            'Learning was four logos on a blue field; Useful Links a wall of text. Nothing learned on one page transferred to the next.',
          ]}
        />
        <p className="hs-sublabel">The legacy portal</p>
        <div className="hs-legacy">
          {LEGACY.map(([name, src]) => (
            <figure className="hs-shot" key={name}>
              <div className="hs-shot__media hs-shot__media--legacy">
                <img src={src} alt={`The legacy iConnect ${name} page`} loading="lazy" />
              </div>
              <figcaption>
                <strong>{name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="hs-hmw">
          <p className="hs-hmw__label">How might we</p>
          <p className="hs-hmw__text">…make iConnect the place an ACD employee starts the working day, with any file, app, course or colleague two clicks away?</p>
        </div>
      </Section>

      <Section n="03" label="" title="Research & Insights" id="ic-research">
        <Lead>I audited all eight modules, listed every link and widget, and regrouped the content by what employees are trying to do.</Lead>
        <div className="hs-chips">
          {['Heuristic audit', 'Content inventory', 'Task-based regrouping', 'Wireframes'].map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
        <Cards
          items={[
            { n: '01', title: 'Group by task, not system', text: 'People look for “the HR system”, not its product name. Apps are grouped by what they do, with search for the rest.' },
            { n: '02', title: 'Growth is one place', text: 'Internal training, external platforms and talent development answer one question, so they live together.' },
            { n: '03', title: 'System before screens', text: 'Eight modules with eight layouts meant every fix happened eight times. A shared library had to come first.' },
          ]}
        />
        <Body>No user data was available, so interviews, a tree test and an analytics baseline are planned for the rollout.</Body>
      </Section>

      <Section n="04" label="" title="Exploration & Key Decisions" id="ic-exploration">
        <Lead>Eight flat modules became five groups, never more than two levels deep.</Lead>
        <div className="hs-ia">
          {IA.map(([group, children]) => (
            <div className="hs-flow" key={group}>
              <Chip solid>{group}</Chip>
              <span className="hs-flow__arrow" aria-hidden="true">→</span>
              {children.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          ))}
        </div>
        <Shots items={[{ title: 'Sitemap', caption: 'Modules in the sidebar; sub-features as tabs or secondary pages', src: icSitemap, alt: 'The iConnect information architecture with five groups and their sub-features' }]} />
        <p className="hs-sublabel">First visit</p>
        <div className="hs-flow">
          {['Sign in', 'Guided tour, 6 steps', 'Home', 'Sidebar or global search', 'Destination'].map((st, i) => (
            <Fragment key={st}>
              {i > 0 && <span className="hs-flow__arrow" aria-hidden="true">→</span>}
              <Chip solid={i === 4}>{st}</Chip>
            </Fragment>
          ))}
        </div>
        <Shots items={[{ title: 'Wireframes', caption: 'Fifteen wireframes tested the structure before any visual design', src: icWireframes, alt: 'A board of fifteen iConnect wireframes: home, help, notifications, useful links, shared folders, applications, learning, talent space, getting social, employee in touch, competencies and the employee handbook' }]} />
        <SubHead>Key decisions</SubHead>
        <div>
          {[
            ['Task-based navigation, two levels max', 'Nine destinations in a persistent sidebar, global search for people, files and news, and the four companies always visible.'],
            ['A home that’s a starting point, not a menu', 'Leadership message and top news lead; weather, prayer times, celebrations and community posts sit as widgets.'],
            ['Apps grouped by function, with search', '29 apps in four sections, each with consistent icons, plus a browser-compatibility guide so launches don’t fail by surprise.'],
            ['Files and records carry their metadata', 'Folders show file count and size; the profile gained a date-ranged attendance table with export.'],
            ['System before screens', '34 component sets, 546 variants and 63 variables. Every module is assembled from the same parts.'],
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
        <div className="hs-ds-pair">
          <figure className="hs-shot">
            <div className="hs-shot__media hs-shot__media--image">
              <img src={icDsColors} alt="The iConnect colour system" loading="lazy" />
            </div>
            <figcaption>
              <strong>Colour system</strong>
              <span>Brand palette, neutral scale, semantic colours and gradients</span>
            </figcaption>
          </figure>
          <figure className="hs-shot">
            <div className="hs-shot__media hs-shot__media--image">
              <img src={icDsType} alt="The iConnect typography scale in Inter" loading="lazy" />
            </div>
            <figcaption>
              <strong>Typography</strong>
              <span>An Inter type ramp from display to caption</span>
            </figcaption>
          </figure>
        </div>
        <Shots
          items={[
            { title: 'Buttons', caption: 'Every style, size and state', src: icDsButtons, alt: 'The iConnect button set in every size and state' },
            { title: 'Cards & widgets', caption: 'Community posts, app tiles, celebrations, news cards and the competency cards, with their empty and hover states', src: icDsCards1, alt: 'iConnect card components: community post, app tile, celebrations, news and competency cards' },
            { title: 'List items', caption: 'Functional-model rows, learning links, app and external-site items, each in its default and hover state', src: icDsLists, alt: 'iConnect list items in default and hover states: competency models, learning links, apps and banking links' },
            { title: 'Dashboard widgets', caption: 'Folder cards, and the weather, currency converter and prayer-time widgets from the home page', src: icDsWidgets, alt: 'iConnect widgets: folder card, Riyadh weather, currency converter and prayer times' },
          ]}
        />
      </Section>

      <Section n="05" label="" title="Final Solution" id="ic-solution">
        <Lead>23 high-fidelity screens across nine modules, plus a six-step guided tour for the first visit.</Lead>
        <Shots
          items={[
            { title: 'Home', caption: 'Leadership message, top news, weather, celebrations, community posts and prayer times', src: icHome, alt: 'The iConnect home page' },
            { title: 'Applications', caption: '29 apps in four sections, with search and a browser guide', src: icApplications, alt: 'My Applications grouped into four sections' },
            { title: 'Document Management', caption: 'A folder per company and area, each with its file count and size', src: icDocuments, alt: 'The Document Management System' },
            { title: 'Learning', caption: 'The internal learning system first, then four external platforms', src: icLearning, alt: 'The Learning page' },
            { title: 'My Profile', caption: 'Employee information, attendance and subordinates in tabs', src: icProfile, alt: 'A profile page' },
            { title: 'ACD Competencies', caption: '12 core competencies as cards, then the functional models', src: icCompetencies, alt: 'The Competencies Framework' },
          ]}
        />
        <p className="hs-sublabel">Guided tour</p>
        <div className="hs-tour">
          {[
            [icTour2, 'Navigation menu'],
            [icTour3, 'Your profile'],
            [icTour4, 'Global search'],
            [icTour5, 'Help & support'],
            [icTour6, 'Your dashboard'],
          ].map(([src, label], i) => (
            <figure className="hs-tour__step" key={label}>
              <img src={src} alt={`Guided tour step ${i + 2} of 6: ${label}`} loading="lazy" />
              <figcaption>
                <span>{i + 2}/6</span> {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
