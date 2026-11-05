/**
 * Hisense Iraq: the installer's companion app. Condensed from the Figma frame
 * "Case Study — Hisense Iraq Installer App" (Projects file, node 3824:179): six flows, told briefly,
 * with the shipped screens where we have them.
 */
import { Body, CaseHero, Lead, Overview, Points, Section, SubHead } from './parts';
import { AppLink } from '../AppLink';
import wire1 from '../../assets/images/hisense/wireframes-1.webp';
import wire2 from '../../assets/images/hisense/wireframes-2.webp';
import shotHomeEn from '../../assets/images/hisense/home-en.webp';
import shotHomeAr from '../../assets/images/hisense/home-ar.webp';
import shotNewEn from '../../assets/images/hisense/new-project-en.webp';
import shotProjects from '../../assets/images/hisense/projects.webp';
import shotRejected from '../../assets/images/hisense/job-rejected.webp';
import shotChat from '../../assets/images/hisense/chat.webp';

const FLOWS: { n: string; title: string; lead: string; text: string; shots?: [string, string, string][] }[] = [
  {
    n: '01 · Joining',
    title: 'A two-minute path from stranger to member',
    lead: 'The welcome screen leads with the brand partnership, then one decision: create an account or log in.',
    text: 'Sign-up asks only for a name, mobile number and password. Verification rides on SMS, which every technician already has: a five-digit code with a resend timer, a wrong-code state that keeps the typed digits for correction, and a confirmation when the phone is verified. Login mirrors the same pattern, with a forgot-password path that resets by mobile number.',
  },
  {
    n: '02 · Identity',
    title: 'Verification that explains itself',
    lead: 'Before the first job, the app verifies who’s working, and says why.',
    text: 'The flow opens with the reason (“we are required to verify your identity… your information will be encrypted and stored securely”), then walks through front ID, back ID and a selfie, each led by an animated illustration showing how to hold the document, with live framing and confirm-before-proceed review. It ends on an under-review screen that shows progress per check, with a stated two-minute expectation.',
  },
  {
    n: '03 · The job',
    title: 'Registering an installation, evidence first',
    lead: 'The core loop is one screen: location, category, type, then the proof, straight from the camera.',
    text: 'Indoor serial, outdoor serial, batch ID and invoice are each captured in place. The scanner overlays a framing guide on the live feed, and the uploading state shows per-file progress with percentage and time remaining, so the technician knows where a slow connection stands before submitting.',
    shots: [[shotNewEn, 'New project', 'One form, camera-first'], [shotRejected, 'Rejected job', 'The reviewer’s reason, what to retake, and one tap to resubmit']],
  },
  {
    n: '04 · Tracking & rewards',
    title: 'Work history with the balance always in sight',
    lead: 'Every screen in the working area carries the points balance in the header; the reward is never more than a glance away.',
    text: 'Jobs live under three tabs, Completed, Pending and Canceled, as scannable cards with product name, description and photo. The first run is designed too: an illustrated empty state with a primary action that points straight at creating the first job.',
    shots: [[shotHomeEn, 'Home', 'Balance, and your projects at a glance'], [shotHomeAr, 'Home, Arabic', 'The same screen, right to left'], [shotProjects, 'Jobs', 'Completed, pending and cancelled, balance in the header']],
  },
  {
    n: '05 · Support & updates',
    title: 'A direct line to the team',
    lead: 'Support is a tab, not a buried link.',
    text: 'The chat room lists conversations by topic, with an empty state that invites the first message. Conversations read like a familiar messenger: timestamps, team replies, the technician’s messages in brand teal. Notifications close the loop between sessions: confirmations, status changes and milestones, each with its icon and relative time.',
    shots: [[shotChat, 'Chat', 'Conversation with the team']],
  },
  {
    n: '06 · Account & resources',
    title: 'Profile, preferences and the product library',
    lead: 'The profile gathers identity in one place, and the toolkit travels with the technician.',
    text: 'Photo, wallet balance and personal info with per-field verification badges, including pending and attention states on the ID row. Settings cover language, preferred payment method, contact and privacy in three labelled groups; the language sheet offers English, Arabic and Kurdish in a single tap. A built-in library adds a product catalogue and a Technical tab of downloadable spec sheets.',
  },
];

export function HisenseCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study · Mobile app · iOS" title="Hisense Iraq: the installer’s companion app" />

      <Section n="01" label="" title="Overview" id="hs-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Client', 'Hisense Iraq'],
            ['Platform', 'iOS app'],
            ['Year', '2025'],
            ['Status', <AppLink key="store" href="https://apps.apple.com/cy/app/hisense-iraq/id6741577388" />],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context" id="hs-context">
        <Lead>A mobile app for AC installation technicians in Iraq. They create an account, verify their identity, log each installation with photo evidence, and watch their balance grow.</Lead>
        <Points
          items={[
            'Product resources, a support line and notifications keep technicians connected to the Hisense team.',
            'Claims are paid by cash, ZainCash, AsiaPay or IQ Card.',
          ]}
        />
        <p className="hs-sublabel">Early wireframes</p>
        <div className="hs-wires">
          <figure className="hs-shot">
            <div className="hs-shot__media hs-shot__media--image hs-shot__media--sketch">
              <img src={wire1} alt="Hand-drawn screen map: sign in and OTP, guidelines, home with points in the corner, the new project form, chat, and a success message" loading="lazy" />
            </div>
            <figcaption>
              <strong>Screen map</strong>
              <span>Sign-in, home, the new-project form, chat and the success state</span>
            </figcaption>
          </figure>
          <figure className="hs-shot">
            <div className="hs-shot__media hs-shot__media--image hs-shot__media--sketch">
              <img src={wire2} alt="Hand-drawn wireframes: a showroom with catalogue and technical sheets, swipeable product models, full product info, PDF browsing, and a profile with the wallet" loading="lazy" />
            </div>
            <figcaption>
              <strong>Showroom and profile</strong>
              <span>Catalogue, technical sheets, product details, and the wallet inside the profile</span>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section n="03" label="" title="The six flows" id="hs-flows">
        {FLOWS.map((f) => (
          <div className="hs-flowblock" key={f.n}>
            <p className="hs-sublabel">{f.n}</p>
            <SubHead>{f.title}</SubHead>
            <Lead>{f.lead}</Lead>
            <Body>{f.text}</Body>
            {f.shots && (
              <div className="hs-shotgrid">
                {f.shots.map(([src, title, caption]) => (
                  <figure className="hs-shotgrid__item" key={title}>
                    <img src={src} alt={`${title}: ${caption}`} loading="lazy" />
                    <figcaption>
                      <strong>{title}</strong>
                      <span>{caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>

      <Section n="04" label="" title="Design language" id="hs-design">
        <Lead>One system holds the 30+ screens together.</Lead>
        <Points
          items={[
            'Hisense teal reserved for primary actions and the active nav state; white cards on soft canvases for every list.',
            'A five-point bottom navigation with a raised centre action for the app’s main verb: register a job.',
            'Friendly spot illustrations for empty, success and instructional moments, and a persistent points header stitching the reward into daily use.',
            'One type family with weight doing the hierarchy, and every flow closing on an explicit confirmation screen rather than a silent return.',
          ]}
        />
      </Section>
    </div>
  );
}
