/**
 * Tummy (tummy.ae): a website redesign, not a from-scratch build. Jubran reworked and extended an
 * existing site for a fresh dog food delivery brand in the UAE: the marketing pages, the plan-builder
 * onboarding and the customer dashboard. Images are his own mockups of the redesigned screens.
 */
import { CaseHero, Lead, Overview, Points, Section, Shots } from './parts';
import hero from '../../assets/images/tummy/hero.webp';
import howItWorks from '../../assets/images/tummy/howitworks.webp';
import onboarding from '../../assets/images/tummy/onboarding.webp';
import products from '../../assets/images/tummy/products.webp';
import pages from '../../assets/images/tummy/pages.webp';
import dashboard from '../../assets/images/tummy/dashboard.webp';
import dogs from '../../assets/images/tummy/dogs.webp';
import mobile from '../../assets/images/tummy/mobile.webp';

export function TummyCaseStudy() {
  return (
    <div className="hs">
      <CaseHero label="Case study · Website redesign · 2022" title="Tummy: a fresh look for fresh dog food" intro="Health and happiness start in the Tummy. Dog food made fresh. #InDogsWeTrust" />

      <Section n="01" label="" title="Overview" id="tm-overview">
        <Overview
          facts={[
            ['Role', 'Product designer'],
            ['Client', 'Tummy · tummy.ae'],
            ['Project', 'Redesign of an existing website'],
            ['Platform', 'Responsive web'],
            ['Scope', 'Marketing site · plan builder · customer dashboard'],
            ['Year', '2022'],
            ['Status', 'No longer online'],
          ]}
        />
      </Section>

      <Section n="02" label="" title="Context" id="tm-brief">
        <Lead>Tummy delivered freshly cooked dog food across the UAE. The site already existed and worked; my job in 2022 was to make it clearer, warmer and easier to use, not to start again.</Lead>
        <Points
          items={[
            'Keep the brand, the content and the way the business works. Improve how it all reads and flows.',
            'Make the value of fresh food obvious in seconds, and make building a plan feel effortless.',
            'Give customers a dashboard they would actually come back to, for deliveries, dogs and plans.',
          ]}
        />
        <Shots items={[{ title: 'The redesigned home page', caption: 'A clear promise up top, the dog front and centre, and one question to get started: what breed do we get to feed?', src: hero, alt: 'A man at an orange desk looking at the redesigned Tummy home page on a MacBook: “It’s never too late to start fresh” beside a spaniel eating from a bowl' }]} />
      </Section>

      <Section n="03" label="" title="Decisions" id="tm-work">
        <Lead>Four areas, each refined rather than reinvented.</Lead>
        <Points
          items={[
            'Marketing pages: a stronger hero, a three-step “How it works” that reads at a glance, and product pages for recipes, treats and broths with consistent cards.',
            'Plan builder: the onboarding questions, one step per screen, in a friendlier tone and with the dog’s name carried through, so it feels like a conversation rather than a form.',
            'Customer dashboard: deliveries, dog profiles, plan and extras in one calm layout, with the next delivery and its address always one click from a change.',
            'Mobile: the same clarity on a phone, from the offer bar to the plan button.',
          ]}
        />
        <Shots
          items={[
            { title: 'How it works', caption: 'Three steps, three illustrations, no scrolling to understand it', src: howItWorks, alt: 'A MacBook on an orange table showing the “How it works” section with three illustrated steps' },
            { title: 'Building a plan', caption: 'The onboarding flow, one question at a time, from the dog’s name to the delivery schedule', src: onboarding, alt: 'A laptop surrounded by floating screens of the plan-builder questions on an orange background' },
            { title: 'Recipes, treats and broths', caption: 'Product pages rebuilt on one card system', src: products, alt: 'Three browser windows on a teal background: the Treats page, the home page and the Broths page' },
            { title: 'Across the site', caption: 'FAQ, recipe details with ingredients and feeding guide, checkout and the getting-started form', src: pages, alt: 'An isometric spread of redesigned pages: FAQ, recipe details, checkout and forms' },
            { title: 'Customer dashboard · Deliveries', caption: 'The next delivery, its address and a change button, plus upcoming deliveries', src: dashboard, alt: 'A laptop showing the Tummy customer dashboard on the Deliveries page' },
            { title: 'Customer dashboard · My dogs', caption: 'Each dog’s profile, habits and health in one place', src: dogs, alt: 'A tablet showing the My Dogs page of the dashboard with a dog profile' },
            { title: 'On mobile', caption: 'The home page and “How it works” on a phone', src: mobile, alt: 'Two iPhones showing the Tummy mobile site: the home page and the How it works section' },
          ]}
        />
      </Section>
    </div>
  );
}
