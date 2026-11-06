/**
 * Dihzahyners: the urban art initiative Jubran founded and led, revitalising public spaces
 * through outdoor painting. Edit the intro, facts and press here; add, remove or reorder
 * projects below. Each project appears in the gallery on /dihzahyners, in the filter
 * buttons (by `medium`), and the first three appear in the teaser on the home page.
 *
 * `shape` sets how the piece sits in the gallery: 'tall' (portrait), 'wide' (landscape)
 * or 'square'. Video projects look best 'wide'.
 * The Uber, Jotun and TEDx films use the platform's own thumbnail (video.thumb); add a local still as `image` (and drop placeholderImage) to stop depending on it.
 */
// Cover stills for the films (their photo series were retired; only the video shows)
import homeOfHope from '../assets/images/home-of-hope.webp';
import tedxBeirutLogo from '../assets/images/tedx-beirut-logo.webp';
import tedxLauLogo from '../assets/images/tedx-lau-logo.webp';
import volumesFeature from '../assets/images/volumes-feature.webp';
import tedxCibelesLogo from '../assets/images/tedx-cibeles-logo.webp';
import dzSummerBeach from '../assets/images/dz/summer-beach.webp';
import dzMzaar from '../assets/images/dz/mzaar.webp';
import dzWellspring from '../assets/images/dz/wellspring.webp';
import dzJounieh from '../assets/images/dz/jounieh-festival.webp';
import dzDsc from '../assets/images/dz/donner-sang-compter.webp';
import dzUber from '../assets/images/dz/uber.webp';
import dzEhdenVans from '../assets/images/dz/ehden-vans.webp';
import dzStreetFood from '../assets/images/dz/street-food.webp';
import dzNabaa from '../assets/images/dz/nabaa.webp';
import dzColourfulLunch from '../assets/images/dz/colorful-lunch.webp';
import tongueTwister from '../assets/images/tongue-twister.webp';
import jotunCover from '../assets/images/jotun-cover.webp';
import karasiPoster from '../assets/images/aiga-karasi-poster.webp';
import bodoCover from '../assets/images/bodo/bodo-05.webp';
import sevenupCover from '../assets/images/sevenup/sevenup-02.webp';

// Photos from the KARASI chair, in order (karasi-01 … karasi-06)
const karasiFiles = import.meta.glob('../assets/images/karasi/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const karasi = Object.keys(karasiFiles)
  .sort()
  .map((k) => karasiFiles[k]);

// Photos from the Paint Up Volumes, in order (volumes-01 … volumes-07)
const volumesFiles = import.meta.glob('../assets/images/volumes/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const volumes = Object.keys(volumesFiles)
  .sort()
  .map((k) => volumesFiles[k]);

// Photos from the Nawaya Network collaboration, in order (nawaya-01 … nawaya-11)
const nawayaFiles = import.meta.glob('../assets/images/nawaya/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const nawaya = Object.keys(nawayaFiles)
  .sort()
  .map((k) => nawayaFiles[k]);

// Photos from A Little Wonderland, in order (wonderland-01 … wonderland-14)
const wonderlandFiles = import.meta.glob('../assets/images/wonderland/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const wonderland = Object.keys(wonderlandFiles)
  .sort()
  .map((k) => wonderlandFiles[k]);

// Photos from Paint Up at Kroum Ehden, in order (ehden-01 … ehden-05)
const ehdenFiles = import.meta.glob('../assets/images/ehden/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const ehden = Object.keys(ehdenFiles)
  .sort()
  .map((k) => ehdenFiles[k]);

// Photos from the TEDxBeirut installation, in order (tedx-01 … tedx-09)
const tedxFiles = import.meta.glob('../assets/images/tedx/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const tedx = Object.keys(tedxFiles)
  .sort()
  .map((k) => tedxFiles[k]);

export interface CreativePiece {
  /** A series with one album per piece (Paint Up Volumes): shown as a row of cards, each with its own link */
  volumes?: { n: string; name: string; src: string; alt: string; album?: string }[];
  id: string;
  title: string;
  /** Type of project; drives the filter buttons */
  medium: string;
  /** Optional; leave empty to hide */
  year: string;
  /** Cover image for the card and the video's poster ('' = show a typographic card instead) */
  image: string;
  /** For talks and other entries without a photo yet: the line shown large on the typographic card */
  place?: string;
  alt: string;
  shape: 'tall' | 'wide' | 'square';
  /** One-line summary shown on the card */
  summary: string;
  /**
   * The full description, one string per paragraph. Links use [text](https://url),
   * and open in a new tab.
   */
  description: string[];
  /** A film (Vimeo or YouTube), played inside the project when opened */
  video?: { provider: 'vimeo' | 'youtube'; id: string; url: string; thumb?: string };
  /** The project's album on Facebook; until set, 'Open project' goes to the Dihzahyners page */
  album?: string;
  /** True while `image` is only a stand-in graphic (the film's own thumbnail or a title card is shown instead) */
  placeholderImage?: boolean;
  /** Show the whole image (no crop) on this colour, for posters and other square artwork */
  fit?: { background: string };
  /** Partners and collaborators, listed under the description. Links use [name](https://url). */
  partners?: string[];
  /**
   * A photo series, shown under the description when the project is opened.
   * Optional `title` and `credit` appear under the photo (links as [text](https://url)).
   */
  photos?: { src: string; alt: string; title?: string; credit?: string }[];
  /** Optional credit lines, shown as a small list under the description: [role, name] */
  credits?: [string, string][];
  /** Hashtags, shown at the end */
  tags?: string[];
}

export const creativeIntro = {
  eyebrow: 'Paint Up! · Urban art initiative',
  title: 'Dihzahyners',
  intro:
    'Paint Up! was founded by a team of artists under the identity Dihzahyners, to create initiatives that make Beirut brighter and more beautiful through colour. As founder and lead, I built and coordinated a team of designers, managed large-scale public interventions, and grew our online community to more than 160,000 followers.',
  /** Short line used on the home-page teaser */
  teaserTitle: 'I also paint',
  /** The last word of the teaser title rolls through these */
  teaserWords: ['cities', 'walls', 'stairs', 'vans', 'chairs', 'tables'],
  teaserLine: 'Paint Up! by Dihzahyners, the urban art initiative I founded to make Beirut brighter through colour.',
};

/** Key facts, shown as a row under the intro */
export const creativeFacts = [
  { value: 'Paint Up!', label: 'Initiative' },
  { value: 'Founder & lead', label: 'Role' },
  { value: '160,000+', label: 'Online community' },
  { value: 'Large-scale', label: 'Public interventions' },
];

/** Media that covered the work (names only, no logos) */
// (The "Featured in" names row was retired; the press section below the projects lists every article.)

/**
 * Years drive the timeline on the Dihzahyners page. Confirmed: AIGA Middle East (2015),
 * Tongue Twister (2017, 'Nehna w el Amar Jiran' festival), the three 2019 films (Vimeo dates).
 * The rest are best estimates from press dates and video uploads; adjust `year` as needed.
 */
export const DIHZAHYNERS_FACEBOOK = 'https://www.facebook.com/Dihzahyners/';

export const creativeWork: CreativePiece[] = [
  {
    id: 'paint-up-uber',
    title: 'Paint Up meets Uber',
    medium: 'Collaboration',
    year: '2017',
    image: dzUber,
    alt: 'The Uber Middle East team in Uber T-shirts, sitting on the staircase they painted in rainbow colours',
    shape: 'wide',
    summary: 'Rejuvenating a lonely, gloomy staircase in the heart of Beirut with the Uber Middle East team.',
    description: [
      'A bright, energized day with the [Uber Middle East](https://www.facebook.com/UberBeirut) team, rejuvenating a lonely and gloomy staircase in the heart of Beirut, using all the colors that rise from the Earth to the Sky.',
    ],
    video: { provider: 'vimeo', id: '332256131', url: 'https://vimeo.com/332256131', thumb: 'https://vumbnail.com/332256131.jpg' },
    album: 'https://vimeo.com/332256131',
  },
  {
    id: 'paint-up-jotun',
    title: 'Paint Up | Jotun',
    medium: 'Collaboration',
    year: '2019',
    image: jotunCover,
    alt: 'Two women walk past a sky-blue wall hung with colourful flower pots, beside a white bistro table and chairs',
    shape: 'wide',
    summary: 'Outdoor initiatives exploring how the public can rejuvenate their spaces with colour.',
    description: [
      '[Paint Up](https://www.facebook.com/Dihzahyners/) takes the public through some outdoor initiatives to explore how they rejuvenate their spaces using the vibrant colors of [Jotun Paints](https://www.jotun.com/).',
    ],
    video: { provider: 'vimeo', id: '332259828', url: 'https://vimeo.com/332259828', thumb: 'https://vumbnail.com/332259828.jpg' },
    album: 'https://vimeo.com/332259828',
  },
  {
    id: 'beautifying-nabaa',
    title: "Paint Up Beautifying Naba'a",
    medium: 'Community',
    year: '2016',
    image: dzNabaa,
    alt: "Rows of paint pots in yellow, orange, blue and pink, each with a brush resting across it",
    shape: 'wide',
    summary: "A two-month initiative in Naba'a, Bourj Hammoud, one of Beirut's most worn-down suburbs.",
    description: [
      "Paint Up kicked off the new year with a two-month long initiative in Naba'a, Bourj Hammoud, in one of Beirut's most worn-down suburbs. Here's a look at what we've been up to, and what 'Beautifying Naba'a' means to us.",
      'A special warm thank you to the trainers and our incredibly talented friends Chady Abousleiman, Ghaleb Hawila and Dima Boulad. To the eyes and ears throughout this project and to who produced this video, Nady Sokhn.',
      "And to our volunteers, friends, families and collaborators who joined us for the journey, you're what makes Beirut that much more colorful.",
    ],
    video: { provider: 'vimeo', id: '162057919', url: 'https://vimeo.com/162057919' },
    partners: [
      '[Recycle Beirut](https://www.facebook.com/RecycleforBeirut/)',
      '[Recycle Lebanon](https://www.facebook.com/recyclelebanon/)',
      '[C U NXT SAT](https://www.facebook.com/CUNXTSAT/)',
      '[طنجرة ضغط - Tanjaret Daghet](https://www.facebook.com/TnjrhDghtTanjaretDaghet/)',
      "[L'Atelier](https://www.facebook.com/latelierhazmieh/)",
      '[Save the Children](https://www.facebook.com/savethechildren/)',
      '[Live Love Beirut](https://www.livelovebeirut.com/)',
      '[Mad Visuals by Chad the Mad](https://www.facebook.com/Mad.VisualE/)',
      '[Beirut Green Project](https://www.facebook.com/beirutgreenproject/)',
    ],
    tags: ['#PaintUpNabaa'],
    album: 'https://www.facebook.com/share/1CHKMj5guD/',
  },
  {
    id: '7up-feels-good',
    title: '7UP® | Feels Good To Be You',
    medium: 'Feature',
    year: '2014',
    image: sevenupCover,
    alt: 'A painter in a respirator mask sitting on a staircase painted in bright stripes and sprayed colour',
    shape: 'wide',
    summary: 'Selected by VICE News as one of three global entrepreneurs and artists for a 7UP® documentary and commercial.',
    description: [
      'Selected by [VICE News](http://company.vice.com/en_us) in London as one of three global entrepreneurs and artists to be featured in a documentary and commercial for the 7UP® "Feels Good To Be You™" film series.',
    ],
    video: { provider: 'youtube', id: 'eljRztEzjv8', url: 'https://www.youtube.com/watch?v=eljRztEzjv8' },
    album: 'https://www.youtube.com/watch?v=eljRztEzjv8',
  },
  {
    id: 'paint-up-bodo',
    title: 'Paint Up meets Bodø',
    medium: 'Collaboration',
    year: '2012',
    image: bodoCover,
    alt: 'Two painters on a ladder filling in a stencilled piano-and-cloud design on the red wall at Bodø',
    shape: 'wide',
    summary: 'Taking it indoors: a dynamically designed stencil on the wall of a newly renovated Beirut pub.',
    description: [
      '[Paint Up](https://www.facebook.com/Dihzahyners) takes it indoors this time, at one of our favourite pubs, [Bodø](https://www.facebook.com/bodobeirut). We added our touch to their newly renovated place, with a dynamically designed stencil on their wall!',
    ],
    video: { provider: 'vimeo', id: '351586761', url: 'https://vimeo.com/351586761' },
    album: 'https://www.facebook.com/share/1QpbFGVnet/',
  },
  {
    id: 'paint-up-aiga-karasi',
    title: 'Paint Up | AIGA Middle East',
    medium: 'Exhibition',
    year: '2015',
    image: karasiPoster,
    fit: { background: '#f37578' },
    alt: 'KARASI: Bringing Design to the Table, the AIGA Middle East exhibition poster for Beirut Design Week 2015',
    shape: 'tall',
    summary: 'One of 20 chairs designed for KARASI: Bringing Design to the Table, at Beirut Design Week 2015.',
    description: [
      'In 2014, [AIGA](http://www.aiga.org/), the professional association for design, celebrated its 100th year. As the first international chapter, [AIGA Middle East](https://www.facebook.com/AigaMiddleEast) continued the festivities through 2015 by hosting a unique exhibit during Beirut Design Week 2015 titled "[KARASI: Bringing Design to the Table](https://www.facebook.com/events/507080009444428/)".',
      '20 designers and multidisciplinary studios were invited to design 20 chairs donated by BDesign. The aim was to showcase the up-and-coming design community in Lebanon and give people the chance to appreciate the work of the design talent in Lebanon.',
      'I give you our painted-up chair at the [AIGA Karasi](http://www.aigakarasi.com/) exhibition.',
    ],
    photos: [
      { src: karasi[0], alt: 'Jubran in a respirator mask crouching beside the bare wooden chair, holding a can of spray paint' },
      { src: karasi[1], alt: 'The chair sprayed matte black, standing against a wall covered in spray-paint marks' },
      { src: karasi[2], alt: 'The black chair masked with strips of paper tape, ready for the stripes to be painted' },
      { src: karasi[3], alt: 'The finished chair on the grass: black-and-white stripes on one half, rainbow stripes on the other, with its Chair No. 4 label' },
      { src: karasi[4], alt: 'Close-up of the striped seat and backrest of the finished chair' },
      { src: karasi[5], alt: 'The chair on show among the other designed chairs in the exhibition garden' },
    ],
    album: 'https://cargocollective.com/dihzahyners/Paint-Up-Aiga-Middle-East',
  },
  {
    id: 'paint-up-tedxbeirut',
    title: 'Paint Up Installation at TEDxBeirut',
    medium: 'Installation',
    year: '2012',
    image: tedxBeirutLogo,
    fit: { background: '#000' },
    alt: 'The TEDxBeirut logo',
    shape: 'square',
    summary: 'A heart of recycled paint cans dripping colour, built to show that #AllWeNeedIs Color.',
    description: [
      '[Paint Up](https://www.facebook.com/Dihzahyners) installation at [TEDxBeirut](http://www.tedxbeirut.com/en/index.php?pp_title_en=Home), to show that #AllWeNeedIs Color! Nothing better than recycling our materials to create great spaces!',
    ],
    photos: [
      { src: tedx[0], alt: 'A workshop table covered in paint tins, brushes and pots of colour' },
      { src: tedx[1], alt: 'Rows of open paint cans in every colour, lined up on a white table' },
      { src: tedx[2], alt: 'The cans arranged on a table in the shape of a heart' },
      { src: tedx[3], alt: 'Close-up of the cans fixed to the board, with bright green paint dripping down' },
      { src: tedx[4], alt: 'A visitor writing a message on the board beneath the heart of paint cans' },
      { src: tedx[5], alt: 'A visitor smiling in front of the installation, holding a sign that reads "All we need is love"' },
      { src: tedx[6], alt: 'Two visitors adding messages to the board around the dripping heart' },
      { src: tedx[7], alt: 'The painted steps reading "All you need is color"' },
      { src: tedx[8], alt: 'The finished installation: the heart of paint cans dripping colour above the "All you need is color" steps' },
    ],
    tags: ['#AllWeNeedIs'],
    album: 'https://www.facebook.com/share/1CdaEB8VhP/',
  },
  {
    id: 'paint-up-volumes',
    title: 'Paint Up Volumes',
    medium: 'Public intervention',
    year: '2012',
    image: volumesFeature,
    alt: 'A volunteer painting a step red on a staircase covered in bright stripes and triangles',
    shape: 'tall',
    summary: 'Seven public staircases in Beirut, each painted in its own pattern, from piano keys to Tetris blocks. Each volume has its own album.',
    volumes: [
      { n: 'V.2', name: 'Piano', src: volumes[0], alt: 'Stairs painted like piano keys', album: 'https://www.facebook.com/share/1FMG6yMs5E/' },
      { n: 'V.3', name: 'Pixels', src: volumes[1], alt: 'Stairs painted in rows of coloured rectangles', album: 'https://www.facebook.com/share/1DxdWmfAXs/' },
      { n: 'V.4', name: 'Triangular', src: volumes[2], alt: 'Stairs painted with rows of triangles', album: 'https://www.facebook.com/share/1E3Vu8eMXS/' },
      { n: 'V.5', name: 'Patterns', src: volumes[3], alt: 'Stairs with a different pattern on every step', album: 'https://www.facebook.com/share/18EVbKPESf/' },
      { n: 'V.6', name: 'Tetris', src: volumes[4], alt: 'Stairs painted as a Tetris mosaic', album: 'https://www.facebook.com/share/1DWMk7QKR3/' },
      { n: 'V.7', name: 'Stripes', src: volumes[5], alt: 'Stairs in pink, blue and green stripes', album: 'https://www.facebook.com/share/1E9nNHTnHr/' },
      { n: 'Special', name: 'Ayadina Initiative', src: volumes[6], alt: 'Rainbow stairs labelled with colour names', album: 'https://www.facebook.com/share/19wdoRCsTs/' },
    ],
    description: [
      '[Paint Up](https://www.facebook.com/Dihzahyners) is an NGO aimed at rejuvenating areas in Beirut, Lebanon, and making the city a brighter, more positive environment through urban and outdoor paint and colour initiatives.',
    ],
    photos: [
      { src: volumes[0], alt: 'Outdoor stairs painted in bands of bright colour, with black stripes like piano keys', title: 'Paint Up V.2 | Piano', credit: 'Photo courtesy of [Dihzahyners](https://www.facebook.com/Dihzahyners)' },
      { src: volumes[1], alt: 'A long city staircase painted in rows of coloured rectangles, like pixels', title: 'Paint Up V.3 | Pixels', credit: 'Photo courtesy of [Dihzahyners](https://www.facebook.com/Dihzahyners)' },
      { src: volumes[2], alt: 'Stairs between buildings painted with rows of colourful triangles', title: 'Paint Up V.4 | Triangular', credit: 'Photo courtesy of Nadim Kamel' },
      { src: volumes[3], alt: 'Stairs painted with a different hand-drawn pattern on every step', title: 'Paint Up V.5 | Patterns', credit: 'Photo courtesy of Nadim Kamel' },
      { src: volumes[4], alt: 'A staircase painted in a Tetris-like mosaic of coloured blocks', title: 'Paint Up V.6 | Tetris', credit: 'Photo courtesy of Nadim Kamel' },
      { src: volumes[5], alt: 'Stairs painted in pink, blue and green stripes, climbing towards a painted mural', title: 'Paint Up V.7 | Stripes', credit: 'Photo courtesy of Nadim Kamel' },
      { src: volumes[6], alt: 'A staircase painted in rainbow bands, each labelled with its colour name', title: 'Paint Up | Ayadina Initiative', credit: 'Photo courtesy of Nadim Kamel' },
    ],
  },
  {
    id: 'paint-up-nawaya',
    title: 'Paint Up | The Nawaya Network Collaboration',
    medium: 'Community',
    year: '2015',
    image: nawaya[2],
    alt: 'Youth, mentors and volunteers sitting in a row in front of the rainbow-striped wall under the Bourj Hammoud bridge',
    shape: 'wide',
    summary: 'Nawaya youth, mentors and volunteers joined the Paint Up team to paint the Bourj Hammoud bridge.',
    description: [
      "[Nawaya](https://www.facebook.com/TheNawayaNetwork) youth, mentors, and volunteers joined with the [Paint Up](https://www.facebook.com/Dihzahyners) team to paint the Bourj Hammoud bridge! What a fantastically fun and colorful day of community service!",
      'Sponsored by [Colortek Kassaa](https://www.facebook.com/Colortekassaa).',
    ],
    photos: [
      { src: nawaya[0], alt: 'A volunteer rolling red paint onto a column of bright vertical stripes' },
      { src: nawaya[1], alt: 'Volunteers painting the wall under the Bourj Hammoud bridge in rainbow stripes' },
      { src: nawaya[2], alt: 'Youth, mentors and volunteers sitting in a row in front of the finished striped wall' },
      { src: nawaya[3], alt: 'Jubran photographing the finished wall under the bridge on his phone' },
      { src: nawaya[4], alt: 'The whole group posing beside the painted bridge pillars' },
      { src: nawaya[5], alt: 'Volunteers adding a stencilled panel to the striped wall' },
      { src: nawaya[6], alt: 'Passers-by watching the painting day under the bridge' },
      { src: nawaya[7], alt: 'The first coloured stripes going up on the bare concrete wall' },
      { src: nawaya[8], alt: 'Jubran and a volunteer with a group of children, one holding up a pink paint roller' },
      { src: nawaya[9], alt: 'Jubran showing the group how to use a long-handled roller' },
      { src: nawaya[10], alt: 'Children and volunteers lined up along the bridge, each painting a section of the wall' },
    ],
    album: 'https://www.facebook.com/share/1FGrdM4Su8/',
  },
  {
    id: 'little-wonderland',
    title: 'A Little Wonderland by Dihzahyners & Dispatch Beirut',
    medium: 'Public intervention',
    year: '2013',
    image: wonderland[1],
    alt: 'A small house in Geitawi transformed: pale blue walls, purple doors and shutters, and a purple bicycle mounted above the door',
    shape: 'wide',
    summary: 'Turning a worn-down, wrecked corner of Geitawi, Achrafieh, into a little wonderland.',
    description: [
      '"A Little Wonderland" was one of our most extraordinary projects yet. [Dihzahyners](https://www.dihzahyners.com/) and [Dispatch Beirut](https://www.facebook.com/DispatchBeirut), with a huge help and hand from our sponsors [Colortek, A deco Center by Kassa\'a](http://www.colortek.eu/), came together to recreate a very worn-down and wrecked part of Geitawi, Achrafieh.',
    ],
    photos: [
      { src: wonderland[0], alt: 'Before: the worn-down old house in Geitawi, with crumbling walls and a faded blue door' },
      { src: wonderland[1], alt: 'After: the house painted pale blue with purple doors and shutters, a purple bicycle mounted on the wall' },
      { src: wonderland[2], alt: 'The team gathered in front of the finished house' },
      { src: wonderland[3], alt: 'The purple bicycle on the wall above the door, with a twisted olive branch in front' },
      { src: wonderland[4], alt: 'A purple-painted pallet bench beside the door, with bougainvillea and flowers' },
      { src: wonderland[5], alt: 'Two of the team on the rooftop above the bicycle' },
      { src: wonderland[6], alt: 'The finished house at golden hour, with a mosaic of colour in the foreground' },
      { src: wonderland[7], alt: 'The ladder against the purple shutters, with the bicycle casting a shadow on the wall' },
      { src: wonderland[8], alt: 'Painting a geometric tile pattern onto the fountain with a stencil' },
      { src: wonderland[9], alt: 'Volunteers painting the window shutters purple' },
      { src: wonderland[10], alt: 'Stencilling the tile pattern onto an old barrel on the roof' },
      { src: wonderland[11], alt: 'Work in progress: the wall painted purple and the door and shutters in place' },
      { src: wonderland[12], alt: 'Volunteers in Dihzahyners T-shirts sharing a laugh during the work' },
      { src: wonderland[13], alt: 'Paint tins and supplies by the old fountain, ready to start' },
    ],
    album: 'https://www.facebook.com/share/1DXTuyjNKH/',
  },
  {
    id: 'paint-up-kroum-ehden',
    title: 'Paint Up at Kroum Ehden',
    medium: 'Collaboration',
    year: '2014',
    image: dzEhdenVans,
    alt: 'Two VW vans painted in bright geometric stripes and chevrons, parked on a hilltop at Kroum Ehden',
    shape: 'wide',
    summary: 'Two VW vans, painted in bright geometric stripes, ready to ride around Ehden.',
    description: [
      'Our new [Paint Up](https://www.facebook.com/Dihzahyners) project at Kroum Ehden was to paint two VW vans. When you’re in Lebanon, make sure to go to Ehden and take a ride in those two pimped-up VW vans.',
      '[See the full album on Facebook](https://www.facebook.com/media/set/?set=a.915205178506606.1073741836.463586680335127&type=3)',
    ],
    photos: [
      { src: ehden[0], alt: 'Both painted vans parked by the pool at Kroum Ehden, reflected in the water' },
      { src: ehden[1], alt: 'One van, striped in pink, yellow, blue and green, in a field below the mountains and a big white cloud' },
      { src: ehden[2], alt: 'Side view of the second van, painted with chevrons and a large diamond in rainbow colours' },
      { src: ehden[3], alt: 'Jubran and a friend taking a selfie from the driver’s seat of the striped van' },
      { src: ehden[4], alt: 'The two vans side by side on a mountain road in the evening sun' },
    ],
    album: 'https://www.facebook.com/share/1CUyj5QK2d/',
  },
  {
    id: 'tongue-twister',
    title: 'Tongue Twister',
    medium: 'Mural',
    year: '2017',
    image: tongueTwister,
    alt: 'The Tongue Twister mural: bold geometric shapes in red, teal, yellow and grey hiding the Arabic words of a tongue twister, with its title and credits painted on the white wall',
    shape: 'wide',
    summary: 'A 12-metre street art mural hiding Arabic tongue twisters in witty visual puzzles, at the top of the Vendôme Stairs in Mar Mikhael.',
    description: [
      'Dihzahyners were commissioned by Kalimat Group to execute a 12-meter long mural, inspired by a book of Arabic tongue twisters. The illustrations hide the words of each tongue twister in a witty puzzle for readers to decipher.',
      'The mural was brought to life for the ‘Nehna w el Amar Jiran’ (The Moon & Us Are Neighbors) Festival, and is nested at the top of the Vendôme Stairs, in the buzzing district of Mar Mikhael, in Beirut, Lebanon.',
    ],
    credits: [
      ['Written by', 'Fatima Sharafeddine'],
      ['Published by', 'Kalimat Publishing'],
      ['Illustrated by', 'Hanane Kai'],
      ['Public artwork by', 'Dihzahyners'],
    ],
    album: 'https://www.facebook.com/share/1A1GxWbawC/',
  },
  {
    id: 'tedx-lau',
    title: 'TEDxLAU talk',
    medium: 'Talk',
    year: '2012',
    image: tedxLauLogo,
    fit: { background: '#000' },
    place: 'Beirut',
    alt: 'The TEDxLAU logo',
    video: { provider: 'youtube', id: 'NKwlBmvbdho', url: 'https://www.youtube.com/watch?v=NKwlBmvbdho', thumb: 'https://i.ytimg.com/vi/NKwlBmvbdho/hqdefault.jpg' },
    shape: 'wide',
    summary: 'Bridging the gap between imagination and execution.',
    description: ['Bridging the gap between imagination and execution.'],
    album: 'https://www.youtube.com/watch?v=NKwlBmvbdho',
  },
  {
    id: 'tedx-cibeles',
    title: 'TEDxCibeles talk',
    medium: 'Talk',
    year: '2013',
    image: tedxCibelesLogo,
    fit: { background: '#000' },
    place: 'Spain',
    alt: 'The TEDxCibeles logo',
    video: { provider: 'youtube', id: '3PJLUmmkNWc', url: 'https://www.youtube.com/watch?v=3PJLUmmkNWc', thumb: 'https://i.ytimg.com/vi/3PJLUmmkNWc/hqdefault.jpg' },
    shape: 'wide',
    summary: 'Redesigning the landscape.',
    description: ['Redesigning the landscape.'],
    album: 'https://www.youtube.com/watch?v=3PJLUmmkNWc',
  },
  {
    id: 'home-of-home',
    title: 'Paint Up! Home of Hope',
    medium: 'Project',
    year: '2016',
    image: homeOfHope,
    alt: 'Volunteers and children painting a wide staircase: giant colouring pencils on the left, bright stripes and triangles on the right',
    shape: 'wide',
    summary: 'Stairs turned into giant colouring pencils at Home of Hope in Kahale, Aley.',
    description: ['Stairs turned into giant colouring pencils at Home of Hope in Kahale, Aley.'],
    album: 'https://www.facebook.com/share/1ERciCjDSK/',
  },
  {
    id: 'summer-beach',
    title: 'Paint Up! Summer beach',
    medium: 'Project',
    year: '2016',
    image: dzSummerBeach,
    alt: 'A pool wall painted in blocks of yellow, blue, teal, pink, lilac and violet, with paint pots and chairs along the edge',
    shape: 'wide',
    summary: 'Paint Up takes over Summer beach. #funinthesun',
    description: ['Paint Up takes over Summer beach. #funinthesun'],
    album: 'https://www.facebook.com/share/1cuDHhSShK/',
  },
  {
    id: 'mzaar-kfardebiane',
    title: 'Paint Up at Mzaar Kfardebiane',
    medium: 'Project',
    year: '2015',
    image: dzMzaar,
    alt: 'A triangle of colourful vertical stripes painted on a grey wall, with a painter leaping in front of it',
    shape: 'wide',
    summary: 'A triangle of bold stripes painted on a plain grey wall.',
    description: ['A triangle of bold stripes painted on a plain grey wall.'],
    album: 'https://www.facebook.com/share/1Nvwcgq1CK/',
  },
  {
    id: 'donner-sang-compter',
    title: 'Paint Up! Donner Sang Compter',
    medium: 'Installation',
    year: '2015',
    image: dzDsc,
    alt: 'A mannequin bust dripping with rainbow paint on a splattered plinth, at the Donner Sang Compter blood-donation event',
    shape: 'wide',
    summary: 'Every year, the world celebrates World Blood Donor Day to honour all voluntary blood donors and the supporters of the blood donation cause.',
    description: ['Every year, the world celebrates World Blood Donor Day to honour all voluntary blood donors and the supporters of the blood donation cause.'],
    album: 'https://www.facebook.com/share/1HpuqxX2Mq/',
  },
  {
    id: 'beirut-street-food',
    title: 'Paint Up! Beirut Street Food',
    medium: 'Project',
    year: '2015',
    image: dzStreetFood,
    alt: 'Oil drums painted with faces, triangles and stripes, lined up on a paint-splattered floor',
    shape: 'wide',
    summary: 'Old oil drums turned into bold, playful pieces for Beirut Street Food.',
    description: ['Old oil drums turned into bold, playful pieces for Beirut Street Food.'],
    album: 'https://www.facebook.com/share/14zozmYsQYV/',
  },
  {
    id: 'wellspring',
    title: 'Paint Up! Wellspring Learning Community',
    medium: 'Project',
    year: '2014',
    image: dzWellspring,
    alt: 'A long black mural of bright geometric triangles spelling INSPIRE on a school courtyard wall',
    shape: 'wide',
    summary: 'An INSPIRE mural of bright triangles for the Wellspring Learning Community.',
    description: ['An INSPIRE mural of bright triangles for the Wellspring Learning Community.'],
    album: 'https://www.facebook.com/share/1FGGw69b2o/',
  },
  {
    id: 'jounieh-festival',
    title: 'Paint Up! Jounieh International Festival',
    medium: 'Project',
    year: '2013',
    image: dzJounieh,
    alt: 'Old tyres and oil drums painted in bright stripes, triangles and splatters',
    shape: 'wide',
    summary: 'Old tyres and oil drums reborn in colour for the Jounieh International Festival.',
    description: ['Old tyres and oil drums reborn in colour for the Jounieh International Festival.'],
    album: 'https://www.facebook.com/share/18XpdRcaff/',
  },
  {
    id: 'colourful-lunch-bgp',
    title: 'Paint Up! A Colourful Lunch with BGP',
    medium: 'Project',
    year: '2013',
    image: dzColourfulLunch,
    alt: 'A row of outdoor chairs repainted in purple, teal, blue and pink, with contrasting orange and yellow slats',
    shape: 'wide',
    summary: 'Outdoor chairs repainted in bright colours for a colourful lunch with BGP.',
    description: ['Outdoor chairs repainted in bright colours for a colourful lunch with BGP.'],
    album: 'https://www.facebook.com/share/1afadUYkHv/',
  },
];

/**
 * Press: articles and features about Dihzahyners and Paint Up, shown as their own section
 * at the bottom of the Dihzahyners page, grouped by year (newest first).
 * `year: null` = the year isn't confirmed yet; those are listed together under "More coverage".
 * Titles are short summaries of each article.
 */
export interface PressItem {
  outlet: string;
  title: string;
  url: string;
  year: number | null;
  /** A feature or campaign rather than an article */
  feature?: boolean;
}

export const pressIntro = {
  title: 'In the press',
  text: 'Our work has been published by a large number of international and regional media, from Forbes and Vogue to Global Voices and Courrier International.',
};

export const press: PressItem[] = [
  { year: 2020, outlet: 'About Her', title: 'Paint spreading positivity: pops of colour across Beirut', url: 'https://www.abouther.com/node/34371/people/features/paint-spreading-positivity-pops-colour-across-beirut' },
  { year: 2020, outlet: 'L’Orient-Le Jour', title: 'Handing the brushes to those who stay, to colour Beirut again', url: 'https://www.lorientlejour.com/article/1231397/passer-les-pinceaux-a-ceux-qui-restent-pour-colorer-de-nouveau-beyrouth.html' },
  { year: 2019, outlet: 'The Arab Weekly', title: 'Street art revitalising Beirut with colours and shapes', url: 'https://thearabweekly.com/street-art-revitalising-beirut-colours-and-shapes' },
  { year: 2017, outlet: 'Global Voices', title: 'Reviving Beirut: how an artist collective is colouring Lebanon’s capital', url: 'https://globalvoices.org/2017/01/13/reviving-beirut-how-an-artist-collective-is-coloring-lebanons-capital/' },
  { year: 2017, outlet: 'Lebanese American University', title: 'The art of regeneration', url: 'https://sard.lau.edu.lb/news/2017/the-art-of-regeneration.php' },
  { year: 2017, outlet: 'L’Orient-Le Jour', title: 'An eye on the stairs of Mar Mikhael', url: 'https://www.lorientlejour.com/article/1039051/loeil-sur-les-escaliers-de-mar-mikhael.html' },
  { year: 2017, outlet: 'Lebanese American University', title: 'A Byblos wall beautified by architecture students', url: 'http://www.lau.edu.lb/news-events/news/archive/byblos_wall_beautified_by_arch/' },
  { year: 2017, outlet: 'My Modern Met', title: '19 stunning staircases transformed by artists around the world', url: 'https://mymodernmet.com/stunning-stair-art/' },
  { year: 2017, outlet: 'Bored Panda', title: 'The most beautiful steps and stairs street art', url: 'http://www.boredpanda.com/most-beautiful-steps-stairs-street-art/' },
  { year: 2015, outlet: 'Forbes', title: 'Beirut’s street art and the line between art and illegal graffiti', url: 'http://www.forbes.com/sites/alexandratalty/2015/02/28/beirut-street-art-lebanon-illegal-graffiti/' },
  { year: 2015, outlet: 'Vogue', title: 'The most amazing staircases on Instagram', url: 'http://www.vogue.com/8214719/amazing-staircases-instagram/' },
  { year: 2015, outlet: 'The Daily Star', title: 'Vogue ranks the Mar Mikhael staircase among the world’s best', url: 'http://dailystar.com.lb/Life/Lubnan/2015/Jan-19/284511-vogue-ranks-mar-mikhael-staircase-among-worlds-best.ashx' },
  { year: 2015, outlet: 'Campaign ME', title: 'Top 10 things we loved this year, and 7UP “Feels Good To Be You” with Dihzahyners', url: 'https://campaignme.com/7up-feels-good-to-be-you-the-dihzahyners/', feature: true },
  { year: 2015, outlet: '7UP', title: 'Originals: the Dihzahyners, painting up Beirut', url: 'http://www.my7up.com/originals/article/originals-the-dihzahyners-painting-up-beirut', feature: true },
  { year: 2014, outlet: 'The Daily Star', title: 'Paint Up Vol. 7: this time it’s personal', url: 'http://www.dailystar.com.lb/Life/Lubnan/2014/Oct-13/273814-paint-up-vol-7-this-time-its-personal.ashx' },
  { year: 2013, outlet: 'Forbes', title: 'The booming business of Beirut street art', url: 'http://www.forbes.com/sites/deborahljacobs/2013/05/03/the-booming-business-of-beirut-street-art-2/' },
  { year: 2013, outlet: 'Coca-Cola', title: 'Featured in a Coca-Cola commercial', url: 'https://www.youtube.com/watch?v=JkNHYgiMd6g', feature: true },
  { year: 2012, outlet: 'Courrier International', title: 'Colouring the steps of Beirut', url: 'https://www.courrierinternational.com/article/2012/10/11/colorer-les-marches-de-beyrouth' },
  { year: 2012, outlet: 'Green Prophet', title: 'Dihzahyners paint up Beirut', url: 'https://www.greenprophet.com/2012/09/dihzahyners-paint-up-beirut/' },
  { year: 2012, outlet: 'The Daily Star', title: 'Is it time for formalist street art?', url: 'http://www.dailystar.com.lb/Culture/Art/2012/Jun-26/178161-is-it-time-for-formalist-street-art.ashx' },
  { year: 2012, outlet: 'Lebanese American University', title: 'We can paint it up', url: 'https://www.lau.edu.lb/news-events/news/archive/we_can_paint_it_up/' },
  { year: 2012, outlet: 'Designboom', title: 'Street art on the steps of Beirut', url: 'https://www.designboom.com/art/street-art-on-the-steps-of-beirut-by-dihzahyners/' },
  { year: 2012, outlet: 'Street Art Utopia', title: 'Three features on Paint Up', url: 'https://streetartutopia.com/2012/06/17/by-dihzahyners-project-in-beirut-lebanon/' },
  { year: 2012, outlet: '20 Minutes', title: '“Our paint transformed our city”', url: 'https://www.20min.ch/fr/story/notre-peinture-a-transforme-notre-ville-176438122749' },
  { year: 2012, outlet: 'Beirut Nightlife', title: 'Beirut is in the eye of the beholder: paint is on everyone’s tongues', url: 'https://www.beirutnightlife.com/news/beirut-is-in-the-eye-of-the-beholder-paint-is-on-everyones-tongues/' },
  { year: 2012, outlet: 'Beirut.com', title: 'Feature on Dihzahyners', url: 'http://www.beirut.com/l/17588' },
];
