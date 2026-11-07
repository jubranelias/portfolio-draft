/**
 * PROJECTS
 * Each entry becomes a card on Home and Works, and a case study page at /works/:slug.
 * Add, remove or reorder entries freely; the "Next case" link follows array order.
 */
import img from '../assets/images';
import hisenseCover from '../assets/images/hisense-cover.webp';
import icCover from '../assets/images/iconnect/cover.webp';
import llCover from '../assets/images/limelines/cover.webp';
import gigthreeCover from '../assets/images/gigthree/cover.webp';
import emunCover from '../assets/images/emun/cover.webp';
import alhilalCover from '../assets/images/alhilal/cover.webp';
import tummyCover from '../assets/images/tummy/cover.webp';

export interface Project {
  slug: string;
  name: string;
  summary: string;
  title: string;
  category: string;
  /** A project that isn't a case study yet: the card links here instead of to a case page */
  external?: { href: string; label: string };
  /** Short status shown as the card's tag instead of its types */
  status?: string;
  /** Case study behind a password (NDA work) */
  locked?: boolean;
  /** Everything the project covers, shown on its card; filters use these too (defaults to [category]) */
  types?: string[];
  client: string;
  year: string;
  services: string[];
  cover: string;
  coverAlt: string;
  challengeTitle: string;
  challenge: string;
  solutionTitle: string;
  solution: string;
  gallery: { src: string; alt: string }[];
  resultsTitle: string;
  results: string;
  outcomes: { value: string; label: string }[];
  /** The project's own colour, used inside its case study and on its card: [on light, on dark] */
  accent?: [string, string, string?];
}

const allProjects: Project[] = [
  {
    slug: 'hisesne',
    accent: ['#00695c', '#3FD0BD', '#00ffd1'],
    name: 'Hisense Iraq',
    summary: 'Incentive app for AC installation technicians',
    title: 'Hisense Iraq: an incentive app for AC installers',
    category: 'App',
    client: 'Hisense Middle East',
    year: '2025',
    services: ['Brand identity', 'Art direction', 'Web'],
    cover: hisenseCover,
    coverAlt: 'Three iPhones on a deep teal background showing the Hisense Iraq app: support chat, the home screen with points and projects, and a new project form',
    challengeTitle: 'Standing out in a crowded space',
    challenge:
      'Hisesne needed a look that felt like its own from day one, and that would hold together across the website, social and everything in between.',
    solutionTitle: 'One system, used everywhere',
    solution:
      'I built a compact visual system: a distinctive mark, a tight colour palette and a set of layout rules that make every new piece feel like part of the same family.',
    gallery: [
      { src: img.hisesne1, alt: 'Placeholder laptop showing the Hisesne website' },
      { src: img.hisesne2, alt: 'Placeholder warm sphere on a violet set' },
    ],
    resultsTitle: 'A brand that is easy to recognise and easy to use',
    results: 'The new identity gave Hisesne a consistent presence across every channel, and a system the team can extend without starting from scratch.',
    outcomes: [
      { value: '00%', label: 'Replace with a result' },
      { value: '00', label: 'Replace with a result' },
      { value: '0 wks', label: 'Brief to launch' },
    ],
  },
  {
    slug: 'e-municipality',
    accent: ['#15639c', '#6CB6EC', '#00b8ff'],
    name: 'e-Municipality',
    summary: 'Bilingual city services app for Jezzine Municipality',
    title: 'e-Municipality: city services in one app',
    category: 'App',
    client: 'Jezzine Municipality',
    year: '2025',
    services: ['Product design', 'iOS and Android', 'Arabic and English'],
    cover: emunCover,
    coverAlt: 'A close-up of an iPhone at an angle on a dark blue background, showing the e-Municipality home screen with Jezzine and the Get Started services',
    challengeTitle: '',
    challenge: '',
    solutionTitle: '',
    solution: '',
    gallery: [],
    resultsTitle: '',
    results: '',
    outcomes: [],
  },
  {
    slug: 'al-hilal-bank',
    accent: ['#b04707', '#ff8a45', '#ff7a00'],
    name: 'Al Hilal Bank',
    summary: 'Mobile banking app and bilingual design system',
    title: 'Al Hilal Bank: mobile banking',
    category: 'App',
    client: 'Al Hilal Bank (ADCB Group)',
    year: '2022 – 2024',
    services: ['Product design', 'iOS and Android', 'Arabic and English', 'Design system'],
    locked: true,
    cover: alhilalCover,
    coverAlt: 'Three iPhones on a dark surface lit in orange and pink, showing Al Hilal Bank’s Personal Finance, virtual debit card and home screens',
    challengeTitle: '',
    challenge: '',
    solutionTitle: '',
    solution: '',
    gallery: [],
    resultsTitle: '',
    results: '',
    outcomes: [],
  },
  {
    slug: 'limelines',
    accent: ['#4a7010', '#A6D84A', '#b8ff00'],
    name: 'Limelines',
    summary: 'News app bringing MENA publishers into one feed',
    title: 'Limelines: one home for MENA news',
    category: 'App',
    types: ['Web', 'App', 'CMS'],
    client: 'Limelines',
    year: '2018 – 2019',
    services: ['Web', 'UX design', 'Development'],
    cover: llCover,
    coverAlt: 'Two iPhones and a MacBook on a dark green background, showing the Limelines app’s Today’s Picks and the web feed',
    challengeTitle: 'Too much to say, too little time to say it',
    challenge:
      'Visitors arrived with one question and had to dig through several pages to find the answer. Limelines needed a site that got people to the point quickly.',
    solutionTitle: 'One idea per screen',
    solution:
      'I reorganised the site around what visitors actually came for, simplified navigation to a handful of clear paths, and kept every page light and quick to load.',
    gallery: [
      { src: img.limelines1, alt: 'Placeholder brand pattern for Limelines' },
      { src: img.limelines2, alt: 'Placeholder laptop showing the Limelines website' },
    ],
    resultsTitle: 'People find what they came for',
    results: 'The new site is faster, simpler to navigate and easier for the Limelines team to update on their own.',
    outcomes: [
      { value: '+00%', label: 'Replace with a result' },
      { value: '0.0 s', label: 'Average load time' },
      { value: '00', label: 'Replace with a result' },
    ],
  },
  {
    slug: 'tummy',
    accent: ['#0a5457', '#4fd1c9', '#19d3c5'],
    name: 'Tummy',
    summary: 'Website redesign for a fresh dog food delivery brand',
    title: 'Tummy: a fresh look for fresh dog food',
    category: 'Web',
    client: 'Tummy (tummy.ae)',
    year: '2022',
    services: ['Website redesign', 'UX improvements', 'Visual design'],
    cover: tummyCover,
    coverAlt: 'An iMac and an iPhone on a black glass desk, reflected in its surface, against a dark background with a warm orange glow, showing the redesigned Tummy home page and Treats page',
    challengeTitle: '',
    challenge: '',
    solutionTitle: '',
    solution: '',
    gallery: [],
    resultsTitle: '',
    results: '',
    outcomes: [],
  },
  {
    slug: 'gigthree',
    accent: ['#C41E3A', '#FF7088', '#ff1f6e'],
    name: 'Gigthree',
    summary: 'Platform connecting companies with vetted executives',
    title: 'Gigthree: executive talent, on demand',
    category: 'Web',
    client: 'Gigthree',
    year: '2019',
    services: ['Product design', 'iOS and Android', 'Design system'],
    cover: gigthreeCover,
    coverAlt: 'A white iPad behind a MacBook Pro on a navy background with a crimson glow, showing the Gigthree website home page',
    challengeTitle: 'Too many steps between interest and booking',
    challenge:
      'Gigthree users were dropping off partway through booking. The flow asked for too much, too early, and it was hard to tell what would happen next.',
    solutionTitle: 'Fewer steps, clearer choices',
    solution:
      'I cut the booking flow down to its essentials, made each step show exactly what comes next, and built a design system the team can grow the product with.',
    gallery: [
      { src: img.gigthree1, alt: 'Placeholder brand pattern for Gigthree' },
      { src: img.gigthree2, alt: 'Placeholder stacked shapes on an orange set' },
    ],
    resultsTitle: 'More bookings, fewer drop-offs',
    results: 'With a shorter, clearer flow, more users now make it from browsing to a confirmed booking.',
    outcomes: [
      { value: '+00%', label: 'Replace with a result' },
      { value: '0.0', label: 'App store rating' },
      { value: '00+', label: 'System components' },
    ],
  },
  {
    // Al Jomaih iConnect: the fourth project. Only the essentials are filled in; the case study text
    // and images are still to come (see IConnectCaseStudy.tsx).
    slug: 'iconnect',
    accent: ['#0025FF', '#7d8dff', '#0025FF'],
    name: 'Al Jomaih iConnect',
    summary: 'Employee intranet for Al Jomaih’s four companies',
    title: 'Al Jomaih iConnect: the employee intranet, redesigned',
    category: 'Web',
    types: ['Web', 'Design system'],
    client: 'Al Jomaih Consumer Division',
    year: '',
    services: ['Information architecture', 'UI design', 'Design system'],
    cover: icCover,
    coverAlt: 'Hands holding an iPad against a deep blue background, showing the iConnect intranet’s My Applications page',
    challengeTitle: '',
    challenge: '',
    solutionTitle: '',
    solution: '',
    gallery: [],
    resultsTitle: '',
    results: '',
    outcomes: [],
  },
];

/** The order projects appear in everywhere (Work page, home page, "next project" links) */
const ORDER = ['iconnect', 'hisesne', 'e-municipality', 'al-hilal-bank', 'limelines', 'gigthree', 'tummy'];
/** The types a project covers */
export const typesOf = (p: Project) => p.types ?? [p.category];

export const projects = [...allProjects].sort((x, y) => {
  const ix = ORDER.indexOf(x.slug);
  const iy = ORDER.indexOf(y.slug);
  return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy);
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
