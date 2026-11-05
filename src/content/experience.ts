/**
 * Confidential industry experience (banking and brokerage), told briefly in narrative form.
 * Shown on the Work page as experience, not as case studies: the work is under NDA.
 */
export interface Experience {
  company: string;
  role: string;
  place: string;
  dates: string;
  domain: string;
  client?: string;
  story: string[];
}

export const experience: Experience[] = [
  {
    company: 'FP Markets',
    role: 'Senior Product Designer',
    place: 'Limassol, Cyprus',
    dates: 'Jan 2025 – Present',
    domain: 'CFD & forex brokerage',
    story: [
      'I lead design for FP Markets’ client portal on web and mobile and its admin portal, turning dense financial data into calm, clear interfaces. Along the way I created the design system our team now relies on, and I’m currently helping shape its new social trading product.',
    ],
  },
  {
    company: 'Eurisko Mobility',
    role: 'Senior UI/UX Designer',
    place: 'Larnaca, Cyprus',
    dates: 'Feb 2022 – Dec 2024',
    domain: 'Digital banking',
    client: 'Al Hilal Bank (ADCB Group), Abu Dhabi',
    story: [
      'For three years I worked on Al Hilal Bank’s mobile banking app, designing across the product and building a bilingual Arabic and English design system.',
    ],
  },
];
