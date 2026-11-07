/**
 * NOTICED — a visual diary of things that caught Jubran's eye:
 * daily life, travels, exhibitions, places and small details.
 *
 * Add a moment: put the photo in src/assets/images/diary/, import it below, and add an entry.
 * Newest first. `kind` is shown with the photo when it's opened. `size` sets how much room it takes on the
 * light table: 'xl' (hero-sized), 'l', 'm' or 's'. `tilt` is a small rotation in degrees
 * (between -3 and 3) that gives the collage its hand-placed feel.
 *
 * Every entry below is a placeholder image; replace them with your own photos.
 */
import img from '../assets/images';

export const diaryIntro = {
  eyebrow: 'Noticed along the way',
  title: 'Diary',
  intro:
    'A visual diary. Places, moments and small details that caught my eye, mostly on the road and often from above.',
  instagramLabel: 'Follow on Instagram',
  // The page now shows the Instagram profile; the entries below are no longer displayed
};

export interface DiaryEntry {
  id: string;
  image: string;
  alt: string;
  /** Where or what, kept short: it is the caption */
  place: string;
  /** Month and year, or any short date */
  date: string;
  kind: 'Everyday' | 'Travel' | 'Exhibitions' | 'Places' | 'Details';
  size: 'xl' | 'l' | 'm' | 's';
  tilt: number;
  /** Optional one-line thought, shown when the photo is opened */
  note?: string;
}

export const diary: DiaryEntry[] = [
  { id: 'd01', image: img.hero8, alt: 'Placeholder pattern of circles and arcs', place: 'Placeholder · A wall that stopped me', date: 'Oct 2026', kind: 'Details', size: 'xl', tilt: -1.2, note: 'Replace with your own photo and a short thought.' },
  { id: 'd02', image: img.about1, alt: 'Placeholder blue still life', place: 'Placeholder · Morning light', date: 'Oct 2026', kind: 'Everyday', size: 'm', tilt: 2 },
  { id: 'd03', image: img.hero3, alt: 'Placeholder laptop on a navy backdrop', place: 'Placeholder · Gallery visit', date: 'Sep 2026', kind: 'Exhibitions', size: 's', tilt: -2.4 },
  { id: 'd04', image: img.post1, alt: 'Placeholder yellow sphere on a green set', place: 'Placeholder · Somewhere new', date: 'Sep 2026', kind: 'Travel', size: 'l', tilt: 1.4 },
  { id: 'd05', image: img.step2, alt: 'Placeholder objects on a set', place: 'Placeholder · Café corner', date: 'Aug 2026', kind: 'Places', size: 'm', tilt: -0.8 },
  { id: 'd06', image: img.hero4, alt: 'Placeholder sphere on an orange set', place: 'Placeholder · Colour study', date: 'Aug 2026', kind: 'Details', size: 's', tilt: 2.6 },
  { id: 'd07', image: img.team2, alt: 'Placeholder portrait', place: 'Placeholder · Street portrait', date: 'Jul 2026', kind: 'Everyday', size: 'm', tilt: -1.8 },
  { id: 'd08', image: img.post3, alt: 'Placeholder warm pattern on a dark ground', place: 'Placeholder · Installation', date: 'Jul 2026', kind: 'Exhibitions', size: 'l', tilt: 0.9 },
  { id: 'd09', image: img.hero7, alt: 'Placeholder bag on green turf', place: 'Placeholder · Market day', date: 'Jun 2026', kind: 'Travel', size: 's', tilt: -2 },
  { id: 'd10', image: img.value2, alt: 'Placeholder still life', place: 'Placeholder · Shadows at noon', date: 'Jun 2026', kind: 'Details', size: 'm', tilt: 1.7 },
  { id: 'd11', image: img.about4, alt: 'Placeholder objects on a beige set', place: 'Placeholder · A quiet place', date: 'May 2026', kind: 'Places', size: 'm', tilt: -1 },
  { id: 'd12', image: img.hero5, alt: 'Placeholder portrait against a green wall', place: 'Placeholder · Weekend away', date: 'May 2026', kind: 'Travel', size: 's', tilt: 2.2 },
];
