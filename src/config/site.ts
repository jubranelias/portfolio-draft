/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * Almost everything brand-specific lives here: name, copy, links,
 * navigation, services, clients, about-page content and FAQs.
 * Projects live in src/content/projects.ts, the visual diary in src/content/diary.ts.
 * Colours, fonts and spacing live in src/styles/tokens.css.
 */
import img from '../assets/images';

export const site = {
  brand: {
    name: 'Jubran Elias',
    wordmark: 'Jubran',
    location: 'Limassol',
    foundedYear: 2019,
    /** Used as the default <title> suffix and meta description */
    seoTitle: 'Jubran Elias',
    seoDescription:
      'Jubran Elias is a freelance product designer turning complex ideas into intuitive digital products.',
  },

  contact: {
    email: 'jubran.elias@gmail.com',
    address: 'Limassol, Cyprus',
  },

  /**
   * Form handling. The template has no backend.
   * Set `endpoint` to any service that accepts a JSON POST
   * (Formspree, Basin, Getform, your own API). Leave empty for demo mode,
   * where submissions are validated but NOT sent.
   */
  forms: {
    contactEndpoint: '',
    newsletterEndpoint: '',
  },

  /**
   * Main navigation. Items marked `side: true` are secondary: on desktop they sit after a
   * thin divider in the menu pill, so the core links keep their order and weight.
   */
  nav: [
    { label: 'Work', to: '/works' },
    { label: 'About', to: '/about' },
    { label: 'Noticed', to: '/noticed' },
    { label: 'Dihzahyners', to: '/dihzahyners', side: true },
  ] as { label: string; to: string; side?: boolean }[],
  /** Shown when hovering the little face in the header */
  status: 'Currently designing',
  navCta: { label: 'Say hello', to: '/contact' },

  /**
   * Intro preloader. variant 1 = Jubran pushes the black wall; 2 = the animated wordmark.
   * compare: shows a small "Intro 1 · 2" switch in the corner so you can try both;
   * set it to false once you've chosen. If you change the default variant, also change
   * DEFAULT_INTRO in index.html so the screen behind the intro starts in the right colour.
   */
  preloader: { variant: 2 as 1 | 2, compare: false },

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jubranelias/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/jubranelias/', icon: 'instagram' },
  ] as const,

  /** 3D hero at the top of the home page. Every string here is editable. */
  hero3d: {
    eyebrow: 'Product designer',
    headline: 'I design digital products that make complex things feel simple.',
    primaryCta: { label: 'Explore my work', to: '/works' },
    secondaryCta: { label: "Let's talk", to: '/contact' },
    availability: 'Available for select projects',
    /** Set to false to hide the green status dot and label */
    available: true,
    scrollLabel: 'Scroll',
    /** Describes the 3D object for screen readers */
  },

  home: {
    /** The hero cycles through these lines. Keep them short. */
    heroHeadlines: ['Products people understand', 'Flows that feel obvious', 'Systems that scale'],
    heroIntro: 'A freelance product designer, from first idea to shipped product.',
    heroCta: { label: 'See who I work with', href: '#clients' },
    heroImages: [
      { src: img.hero1, alt: 'Placeholder portrait in a grey jacket against a pale blue wall' },
      { src: img.hero2, alt: 'Placeholder stack of printed cards on a beige set' },
      { src: img.hero3, alt: 'Placeholder laptop showing a website on a navy backdrop' },
      { src: img.hero4, alt: 'Placeholder product sphere on an orange set' },
      { src: img.hero5, alt: 'Placeholder portrait against a green wall' },
      { src: img.hero6, alt: 'Placeholder pair of phones showing an app' },
      { src: img.hero7, alt: 'Placeholder shopping bag on green turf' },
      { src: img.hero8, alt: 'Placeholder brand pattern of circles and arcs' },
    ],
    clientsTitle: 'Clients',
    clientsIntro:
      'I work with founders, startups and in-house product teams, from a first idea on a napkin to products used every day.',
    studioIntro: { kicker: 'Hi, I’m Jubran.', line: 'One designer, start to finish.' },
    servicesStatement:
      'I design digital products end to end. Clear thinking first, then the craft: research, flows, interfaces, prototypes and the small details that make people trust what they use.',
  },

  /**
   * Client logos in the home-page marquee. Logos live in src/assets/images/clients/ as
   * single-colour marks on transparency (they flip to light in dark mode). `tall` gives
   * square or upright logos a little more height so they look balanced next to wide ones.
   */
  clients: [
    { name: 'Decathlon', logo: 'decathlon-mono.png', ratio: 6.517, color: 'decathlon-color.webp', colorDark: 'decathlon-color-dark.webp' },
    { name: 'UNDP', logo: 'undp-mono.png', ratio: 0.493, color: 'undp-color.webp' },
    { name: 'LAU', logo: 'lau-mono.png', ratio: 2.459, color: 'lau-color.webp', colorDark: 'lau-color-dark.webp' },
    { name: 'Live Love', logo: 'livelove-mono.png', ratio: 4.667 },
    { name: 'Lokalee', logo: 'lokalee-mono.png', ratio: 2.938, color: 'lokalee-color.webp', colorDark: 'lokalee-color-dark.webp' },
    { name: 'Al Bahar International', logo: 'albahar-mono.png', ratio: 5.882, color: 'albahar-color.webp', colorDark: 'albahar-color-dark.webp' },
    { name: 'Colortek', logo: 'colortek-mono.png', ratio: 1.913, color: 'colortek-color.webp', colorDark: 'colortek-color-dark.webp', tall: true },
    { name: 'ACD', logo: 'acd-mono.png', ratio: 3.092, color: 'acd-color.webp' },
    { name: 'Code Technologies', logo: 'codetech-mono.png', ratio: 3.704, color: 'codetech-color.webp', colorDark: 'codetech-color-dark.webp' },
    { name: 'Colorwall', logo: 'colorwall-mono.png', ratio: 1.027, color: 'colorwall-color.webp', colorDark: 'colorwall-color-dark.webp' },
    { name: 'Tummy', logo: 'tummy-mono.png', ratio: 4.478, color: 'tummy-color.webp', colorDark: 'tummy-color-dark.webp' },
    { name: 'Technocrete', logo: 'technocrete-mono.png', ratio: 4.545, color: 'technocrete-color.webp' },
    { name: 'Seal', logo: 'seal-mono.png', ratio: 2.041, color: 'seal-color.webp', colorDark: 'seal-color-dark.webp' },
    { name: 'ETE', logo: 'ete-mono.png', ratio: 1.307, color: 'ete-color.webp', colorDark: 'ete-color-dark.webp' },
  ] as { name: string; logo: string; ratio: number; color?: string; colorDark?: string; tall?: boolean }[],

  services: [
    { title: 'Product strategy', line: 'From a fuzzy idea to a clear plan', thumb: 'strategy' as const },
    { title: 'UX & UI design', line: 'Every screen and every tap thought through', thumb: 'ux' as const },
    { title: 'Design systems', line: 'Built to scale with your team', thumb: 'systems' as const },
  ],

  cta: {
    kicker: 'Let’s talk',
    title: 'Tell me what you’re building. I’ll tell you how I’d design it.',
    button: { label: 'Start a project', to: '/contact' },
    note: 'I reply within two working days.',
    image: img.ctaBg,
    /** Optional looping background video (an .mp4 URL or import). Leave empty to use the image. */
    video: '',
  },

  about: {
    kicker: 'About me',
    title: 'I design digital products that make complex things feel simple.',
    /** "My story" on the About page: the paragraphs and a closing line (the page title above sets the theme) */
    story: {
      paragraphs: [
        'I’m Jubran Elias, a Product Designer focused on turning complex problems, workflows, and systems into clear, useful experiences people can actually understand and use.',
        'I care about clarity: not only how a product looks, but how it works, what it communicates, and how easily someone can move through it.',
        'My work is shaped by curiosity and structure. I like understanding the problem behind the screen: what people are trying to achieve, where things become confusing, what has already been tried, and where design can make a meaningful difference.',
        'Over the years, I’ve worked across fintech, financial services, SaaS, and mobile products, designing everything from end-to-end user flows and complex dashboards to design systems and everyday product interactions. I enjoy working on products where there’s a lot to untangle, and finding the structure that makes everything feel more intuitive.',
        'I also believe good design is rarely about adding more. It’s about knowing what matters, removing unnecessary friction, and creating enough clarity for people to feel confident about what they’re doing.',
        'Today, I’m especially interested in the space between product thinking, UX, UI, and design systems, creating experiences that are not only visually strong, but consistent, scalable, and built to work in the real world.',
      ],
      closing: 'For me, good design should feel clear, intentional, and effortless.',
    },
    /** "A few things I’m into" on the About page: four cards, each with a small animated icon */
    interests: {
      title: 'A few things I’m into',
      items: [
        { icon: 'travel', title: 'Travel & exploring', note: 'Curiosity has no return ticket. I travel to immerse myself deeply in other cultures, keep my plans flexible, and come back having grown a little with every trip.' },
        { icon: 'food', title: 'Food', note: 'Finding the best burger in town is a serious side quest. I keep an eye on Google for new places popping up, and book a pop-up dinner whenever I can.' },
        { icon: 'movies', title: 'Movies', note: 'Good stories. Big screens. Too much popcorn. Marvel and superhero films are my thing, and I’m a huge fan of anything with time travel or parallel universes.' },
        { icon: 'photography', title: 'Photography', note: 'I create visual content with my drone and my phone, capturing places, moments and anything I find visually interesting.' },
      ] as { icon: 'travel' | 'food' | 'movies' | 'photography'; title: string; note: string }[],
    },
    valuesTitle: 'What I hold myself to',
    values: [
      { title: 'Quality in the details', text: 'I sweat the pixels, the copy and the edge cases, and I test with real users before calling anything done.', image: img.value1 },
      { title: 'Experiences, not screens', text: 'I design how something feels to use, not only how it looks in a screenshot.', image: img.value2 },
      { title: 'A real partnership', text: 'I take on a handful of clients at a time, so each one gets my full attention.', image: img.value3 },
    ],
  },

  contactPage: {
    title: 'Say hello',
    intro: 'Have a product that needs untangling, or just want to say hi?',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'How much does a project cost?', a: 'Every project is different, so I don’t sell fixed packages. After a short first call, I send a clear, fixed quote based on your scope, so there are no surprises.' },
      { q: 'How long does a typical project take?', a: 'It depends on the scope. A focused UX review can take a couple of weeks, while a new product from discovery to handoff usually takes a few months. You’ll get a week-by-week plan before we start.' },
      { q: 'Do you work with clients outside Cyprus?', a: 'Yes. I work remotely with clients in different countries and time zones, and plan calls around your working hours.' },
      { q: 'Can you work with our in-house team?', a: 'Yes, and I often prefer it. I work alongside your developers, product managers and designers, and hand over design systems, components and documentation your team can keep building on.' },
    ],
  },

  footer: {
    note: 'Freelance product designer turning complex ideas into intuitive digital products.',
    credits: [] as { label: string; href: string }[],
  },
};

export type Site = typeof site;
