/**
 * e-Municipality App for Jezzine Municipality. Condensed from the Figma frame
 * "Case Study · e-Municipality App" (Projects file, node 3852:18403): 70 screens cut down to seven,
 * since the app isn't public yet. People, names and phone numbers in the screens are fictional.
 */
import { CaseHero, Lead, Overview, Points, Section, Shots } from './parts';
import hero from '../../assets/images/emun/hero.webp';
import applyTrack from '../../assets/images/emun/apply-track.webp';
import pollArabic from '../../assets/images/emun/poll-arabic.webp';

export function EMunicipalityCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study · Mobile app · iOS & Android" title="e-Municipality: city services in one app" />

      <Section n="01" label="" title="Overview" id="em-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Client', 'Jezzine Municipality'],
            ['Platform', 'iOS & Android'],
            ['Languages', 'English · Arabic'],
            ['Scope', '13 flows · 70 screens'],
            ['Status', 'Handed off for development'],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context" id="em-context">
        <Lead>Residents of Jezzine had to visit the municipal office to request a permit, raise a complaint or follow what the council decided. The app puts all of it in their pocket.</Lead>
        <Points
          items={[
            'A personal home dashboard and five tabs: Services, Complaints, Home, Municipal Tax and Profile.',
            'Every municipal touchpoint is one or two taps away, in English or Arabic.',
          ]}
        />
        <Shots items={[{ title: 'The app at a glance', caption: 'Splash, home dashboard and the municipal services catalogue', src: hero, alt: 'Three phones on blue: the Jezzine Municipality splash screen, the home dashboard and the list of municipal services' }]} />
      </Section>

      <Section n="03" label="" title="Decisions" id="em-decisions">
        <Lead>Six choices shaped the experience.</Lead>
        <Points
          items={[
            'Guest-first access: residents can explore and call the municipality before creating an account.',
            'Two ways to apply: separate Applicant and Beneficiary forms, so a request for a family member never mixes up whose details are whose.',
            'Less typing: forms pull name, mobile and email from the profile, so residents only add what is specific to the request.',
            'Status you can trust: colour-coded badges, an estimated processing time and a dated history on every request.',
            'A voice, not just a service: polls with live results, plus one channel for complaints and suggestions.',
            'Built for both languages: a language choice on first launch and mirrored right-to-left layouts.',
          ]}
        />
        <Shots
          items={[
            { title: 'Apply, then track', caption: 'A request made for someone else, and every request with its status', src: applyTrack, alt: 'Two phones: a renovation permit form with “Someone else” selected and the beneficiary’s details, and the Track Requests list with Submitted, Completed and Rejected badges' },
            { title: 'A civic voice, in both languages', caption: 'Live poll results, and the same request form right to left', src: pollArabic, alt: 'Two phones: poll results with a bar for each street, and the renovation request form in Arabic' },
          ]}
        />
      </Section>
    </div>
  );
}
