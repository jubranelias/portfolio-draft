/**
 * Limelines: full case study. Copy is verbatim from the Figma frame "Case Study / Limelines"
 * (Projects file, node 3658:563); presentation follows the site's design (shared parts).
 * Image slots show a quiet placeholder until real images are added (see `src` on each shot).
 */
import { Fragment } from 'react';
import { CaseHero, Cards, Lead, More, Overview, Points, Section, Shots, SubHead } from './parts';
import dsFoundations from '../../assets/images/limelines/ds-foundations.webp';
import dsComponents1 from '../../assets/images/limelines/ds-components-1.webp';
import dsComponents2 from '../../assets/images/limelines/ds-components-2.webp';
import dsComponents3 from '../../assets/images/limelines/ds-components-3.webp';
import { AppLink } from '../AppLink';
import cmsSearch from '../../assets/images/limelines/cms-search.webp';
import cmsEngagement from '../../assets/images/limelines/cms-engagement.webp';
import cmsFeeds from '../../assets/images/limelines/cms-feeds.webp';
import cmsReports from '../../assets/images/limelines/cms-reports.webp';
import cmsExplore from '../../assets/images/limelines/cms-explore-notifications.webp';
import llMainIdea from '../../assets/images/limelines/main-idea.webp';
import llMobileApp from '../../assets/images/limelines/mobile-app.webp';
import llWireframes from '../../assets/images/limelines/wireframes.webp';
import llOnboarding from '../../assets/images/limelines/onboarding.webp';
import llAppScreens from '../../assets/images/limelines/app-screens.webp';
import llTodaysPicks from '../../assets/images/limelines/todays-picks.webp';
import llAds from '../../assets/images/limelines/ads.webp';
import llShareLine from '../../assets/images/limelines/share-line.webp';
import llWebForYou from '../../assets/images/limelines/web-for-you.webp';
import llWebExplore from '../../assets/images/limelines/web-explore.webp';
import llCurations from '../../assets/images/limelines/curations.webp';
import llDownload from '../../assets/images/limelines/download.webp';

export function LimelinesCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study · Web · Mobile app · CMS" title="Limelines: one home for MENA news" />

      <Section n="01" label="" title="Overview" id="ll-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Platforms', 'iOS, Android, web, CMS'],
            ['Years', '2018 – 2019'],
            ['Timeline & status', <AppLink key="store" href="https://apps.apple.com/cy/app/limelines-%D9%84%D8%A7%D9%8A%D9%85-%D9%84%D8%A7%D9%8A%D9%86%D8%B2/id1438101785" />],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context" id="ll-context">
        <Lead>A region of avid readers and thousands of scattered publishers, with no single place to read the region’s news.</Lead>
        <Points
          items={[
            'MENA media spans countries, languages and formats, from major outlets to local blogs.',
            'International aggregators handled Arabic poorly and knew little about the region.',
            'Limelines set out to be “the center of public interest and attention”: one home for the freshest stories, by the topics readers follow.',
          ]}
        />
        <Shots items={[{ title: 'On the region, from the region', caption: 'Content from the best publishers across 19 MENA countries, by what each reader cares about', src: llMainIdea, alt: 'The Limelines main idea, with publisher tiles from across the region' }]} />
      </Section>

      <Section n="03" label="" title="Research" id="ll-research">
        <Lead>We talked to readers and publishers, audited the aggregators, and watched early usage. Three things stood out.</Lead>
        <Cards
          items={[
            { n: '01', title: 'Topics beat outlets', text: 'Readers think in interests (football, tech, their city), not in publisher brands.' },
            { n: '02', title: 'Trust needs visible sources', text: 'Aggregation only works if the original publisher stays visible on every story.' },
            { n: '03', title: 'Sharing is the loop', text: 'Stories travel through WhatsApp and social. Sharing was the growth engine, not a feature.' },
          ]}
        />
        <More label="What the research involved">
          <p>Reader interviews across the region on daily news habits, trusted sources and language. A competitive audit of global aggregators and regional apps: onboarding, personalisation models and Arabic/RTL support. Sessions with publishers on attribution and how their stories should appear in a shared feed. And early usage and sharing data to see which topics and formats drove engagement.</p>
        </More>
      </Section>

      <Section n="04" label="" title="Decisions" id="ll-exploration">
        <Lead>Readers pick interests before they ever see a feed, so the very first session already feels theirs.</Lead>
        <div className="hs-steps">
          {[
            ['01', 'Onboard', 'Language & region'],
            ['02', 'Pick interests', 'Topics + publishers'],
            ['03', 'Personalised feed', 'Freshest stories first', true],
            ['04', 'Read & save', 'In-app reader, bookmarks'],
            ['05', 'Share', 'One-tap share links'],
          ].map(([n, t, d, on], i) => (
            <Fragment key={n as string}>
              {i > 0 && <span className="hs-steps__arrow" aria-hidden="true">→</span>}
              <div className={`hs-step ${on ? 'hs-step--on' : ''}`}>
                <span className="hs-step__n">{n}</span>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </Fragment>
          ))}
        </div>
        <Shots
          items={[
            { title: 'Wireframes', caption: 'How dense a feed can get before it stops being scannable', src: llWireframes, alt: 'Grey wireframes of the Limelines app screens' },
            { title: 'Onboarding', caption: 'Three quick steps: interests, countries, a few curated publishers', src: llOnboarding, alt: 'Three onboarding screens' },
          ]}
        />
        <SubHead>Key decisions</SubHead>
        <div>
          {[
            ['Topic-first personalisation', 'Onboarding asks for interests, not outlets. Publisher follows come later, once readers see whose stories they keep opening.'],
            ['Publisher-forward story cards', 'Every card carries the source’s name and logo, so readers can judge credibility at a glance.'],
            ['Bilingual, RTL-native layout', 'Arabic and English as equals: mirrored navigation and type tuned per script, not an LTR design flipped afterwards.'],
            ['One design system, three surfaces', 'iOS, Android and web share the same card anatomy and topics, so nothing has to be relearned.'],
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
        <Lead>One system across the reader apps, the web and the CMS: lime on a calm neutral base, Space Grotesk headlines with Inter body, and a component library from atoms to organisms, in light and dark.</Lead>
        <Shots
          items={[
            { title: 'Foundations', caption: 'Lime and neutral scales, semantic colours, Space Grotesk and Inter type ramp, spacing, radius, elevation and dark mode', src: dsFoundations, alt: 'The Limelines design-system foundations sheet: colour, typography, spacing, radius, elevation and dark mode' },
            { title: 'Components: atoms, molecules, organisms', caption: 'Buttons, inputs, selection controls, search and tabs, alerts, and the story card, publisher card and feed-approval row', src: dsComponents1, alt: 'Limelines components: buttons, inputs, selection controls, molecules and organisms' },
            { title: 'Components: icons to tables', caption: 'Icons, badges, tags and toggles, avatars, breadcrumbs and pagination, menus and tables, in light and dark', src: dsComponents2, alt: 'Limelines components: icons, badges, avatars, breadcrumbs, menus and tables in light and dark' },
            { title: 'Components: data and content', caption: 'Statistics, pie charts, calendar, data records and the file uploader, in light and dark', src: dsComponents3, alt: 'Limelines components: statistics, pie charts, calendar, data records and file uploader' },
          ]}
        />
      </Section>

      <Section n="05" label="" title="Solution" id="ll-solution">
        <Lead>A fast, scannable feed with deep customisation: follow topics and publishers, read without distraction, share with one tap.</Lead>
        <Shots
          items={[
            { title: 'The mobile app', caption: 'Live on iOS, Android and Huawei: “Fresh news from MENA”', src: llMobileApp, alt: 'The Limelines app on the App Store' },
            { title: 'Today’s Picks, Explore and topics', caption: 'A personal front page, trending lines, and a page for every interest', src: llTodaysPicks, alt: 'Three app screens' },
            { title: 'App screens', caption: 'For You, stories, podcasts and video, topic pages and creating a line', src: llAppScreens, alt: 'A spread of app screens' },
            { title: 'Lines: share your reading', caption: 'Collect stories into lines and share them with friends and colleagues', src: llShareLine, alt: 'Sharing a story and a profile with its lines' },
            { title: 'Ad formats', caption: 'Immersive full-screen ads and native stories that blend into the feed', src: llAds, alt: 'Full-screen and native ad formats' },
            { title: 'The web app', caption: 'English in 2018, Arabic and French in 2019', src: llWebForYou, alt: 'The Limelines web app For You feed' },
            { title: 'Explore on the web', caption: 'Top pages, the week’s trendiest stories and top publishers', src: llWebExplore, alt: 'The Explore page' },
            { title: 'Curations', caption: 'Stories classified by interest, personalised by behaviour, clustered by event', src: llCurations, alt: 'Curated collections on the web app' },
          ]}
        />
        <SubHead>The admin side: Limelines CMS</SubHead>
        <Lead>We also designed the editors’ tools, so the topics and channels they manage are exactly what readers see in their feed.</Lead>
        <Shots
          items={[
            { title: 'Search & story curation', caption: 'Browse, filter and curate every story, publisher and line', src: cmsSearch, alt: 'The CMS search screen on a tablet' },
            { title: 'Feeds moderation', caption: 'Approve or reject incoming publisher feeds', src: cmsFeeds, alt: 'The CMS feeds screen' },
            { title: 'Reports & audience engagement', caption: 'Engagement per story, publisher and interest', src: cmsEngagement, alt: 'The audience engagement report, figures blurred' },
            { title: 'Analytics & ad reports', caption: 'Interest breakdowns and targeted ad performance', src: cmsReports, alt: 'Interest and ad reports, figures blurred' },
            { title: 'Explore, curations & notifications', caption: 'Editing Explore, special coverage and targeted notifications', src: cmsExplore, alt: 'CMS screens for Explore, curations and notifications' },
          ]}
        />
        <Shots items={[{ title: 'Web and app, everywhere', caption: 'Topic, story, publisher and profile pages on the web, and the apps on every store', src: llDownload, alt: 'Four Limelines web pages and the App Store, Google Play and AppGallery badges' }]} />
      </Section>
    </div>
  );
}
