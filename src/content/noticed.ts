/**
 * The photo gallery on the Noticed page. Each entry: the image, its size (so the grid never jumps),
 * alt text, an optional caption (place · year) and how big it sits in the grid.
 * size: how it sits in the grid (see PhotoSize). Order = display order; the sizes below tile without gaps.
 * Fifteen of Jubran's own drone photos, from above.
 */
import switchbacks from '../assets/images/noticed/switchbacks.webp';
import valley from '../assets/images/noticed/valley.webp';
import peninsula from '../assets/images/noticed/peninsula.webp';
import hills from '../assets/images/noticed/hills.webp';
import lake from '../assets/images/noticed/lake.webp';
import reservoir from '../assets/images/noticed/reservoir.webp';

import ponds_dusk from '../assets/images/noticed/ponds-dusk.webp';
import ridge from '../assets/images/noticed/ridge.webp';
import gorge from '../assets/images/noticed/gorge.webp';
import sunset_hills from '../assets/images/noticed/sunset-hills.webp';
import canal from '../assets/images/noticed/canal.webp';
import clouds from '../assets/images/noticed/clouds.webp';
import beach from '../assets/images/noticed/beach.webp';
import palms from '../assets/images/noticed/palms.webp';
import islet from '../assets/images/noticed/islet.webp';
/** wide 8×4 · tall 4×8 · portrait 4×4 (desktop grid cells): one wide, one tall and two portraits tile an 8-row block */
export type PhotoSize = 'wide' | 'tall' | 'portrait';
export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
  size: PhotoSize;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/jubranelias/';

export const noticedIntro = {
  title: 'Noticed',
  lead: 'Things I noticed, mostly from above and mostly on foot. A few of them, before the rest on Instagram.',
};

export const photos: Photo[] = [
  { src: valley, w: 1200, h: 675, alt: 'A valley of fields and ruins running down to a reservoir and the sea, under a bright hazy sky', size: 'wide' },
  { src: switchbacks, w: 675, h: 1200, alt: 'A mountain road folding back on itself in hairpin bends through pine forest, seen from above', size: 'tall' },
  { src: beach, w: 960, h: 1200, alt: 'Someone lying alone on pale sand where turquoise sea meets the shore, from above', size: 'portrait' },
  { src: sunset_hills, w: 968, h: 1200, alt: 'Rolling hills in golden haze with the sun setting over a small lake', size: 'portrait' },
  { src: lake, w: 1200, h: 675, alt: 'A reservoir with green wooded shores and a road curving past a bright field', size: 'wide' },
  { src: peninsula, w: 675, h: 1200, alt: 'A rocky peninsula with a hotel at its tip, surrounded by deep blue and turquoise sea, seen from above', size: 'tall' },
  { src: ridge, w: 960, h: 1200, alt: 'A rocky ridge above a sea of clouds at sunset', size: 'portrait' },
  { src: clouds, w: 960, h: 1200, alt: 'A mountain ridge rising from a sea of clouds under a warm sky', size: 'portrait' },
  { src: reservoir, w: 1200, h: 675, alt: 'A deep blue reservoir between pale dry banks and rolling hills', size: 'wide' },
  { src: hills, w: 675, h: 1200, alt: 'Terraced hillsides and green fields with a dirt track winding between them', size: 'tall' },
  { src: ponds_dusk, w: 1089, h: 1200, alt: 'Mountain reservoirs catching the last light, with a sea of clouds and an orange dusk beyond', size: 'portrait' },
  { src: islet, w: 960, h: 1200, alt: 'Small islets and a pale rock with a tiny chapel in deep blue sea, seen from above', size: 'portrait' },
  { src: gorge, w: 960, h: 1200, alt: 'A pale green river between a dry bank and dense forest, straight down from above', size: 'portrait' },
  { src: palms, w: 960, h: 1200, alt: 'A green river curling through palm forest, with outrigger boats moored at the bank', size: 'portrait' },
  { src: canal, w: 960, h: 1200, alt: 'Two narrow garden islands on dark water, seen straight from above', size: 'portrait' },
];
