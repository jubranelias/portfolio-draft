/**
 * Confidential industry experience, told briefly in narrative form.
 * Shown on the Work page as experience, not as a case study: the work is under NDA.
 * (Al Hilal Bank with Eurisko Mobility is now a password-protected project on the Work grid.)
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
];
