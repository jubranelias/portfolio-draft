/**
 * "Places that shaped me" on the About page: the globe's markers.
 * kind: lived · travel · studied. Coordinates are [latitude, longitude].
 * Add or edit places here; the globe, legend, counts and place list all update from this list.
 */
export type PlaceKind = 'lived' | 'travel' | 'studied';

export interface Place {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  kind: PlaceKind;
  /** ISO 3166 country code, shown as a small flag */
  cc: string;
  /** Short time label, e.g. "2022 – 2024" or "Now" */
  when?: string;
  /** Optional one-line story shown in the card */
  note?: string;
}

export const journeyIntro = {
  eyebrow: 'Places that shaped me',
  title: 'A map of where I’ve lived, learned and wandered.',
  hint: 'Drag the globe to explore. Pick a place to see the story behind it.',
};

export const KIND_LABEL: Record<PlaceKind, string> = {
  lived: 'Places I’ve lived',
  travel: 'Places I’ve travelled',
  studied: 'Places I’ve studied',
};

/** The home base: travel arcs start here */
export const HOME_ID = 'cyprus';

export const places: Place[] = [
  // studied
  { id: 'lau', name: 'Lebanese American University', country: 'Beirut', cc: 'LB', lat: 33.893, lon: 35.478, kind: 'studied', when: '2011', note: 'Where I studied, and later came back with the Dihzahyners team as one of the speakers at TEDxLAU.' },
  { id: 'victoria-uni', name: 'Victoria University', country: 'Melbourne', cc: 'AU', lat: -37.79, lon: 144.9, kind: 'studied', when: '2016', note: 'Where I studied and worked.' },
  // lived
  { id: 'lebanon', name: 'Lebanon', country: 'Middle East', cc: 'LB', lat: 33.89, lon: 35.5, kind: 'lived', note: 'Where it started: design, Dihzahyners and painting Beirut’s stairs in colour.' },
  { id: 'australia', name: 'Australia', country: 'Oceania', cc: 'AU', lat: -37.81, lon: 144.96, kind: 'lived', note: 'Home for a chapter in Melbourne.' },
  { id: 'cyprus', name: 'Cyprus', country: 'Mediterranean', cc: 'CY', lat: 34.9, lon: 33.2, kind: 'lived', when: 'Now', note: 'My second home. I settled here, and it’s where I live today.' },
  // travelled
  { id: 'spain', name: 'Spain', country: 'Europe', cc: 'ES', lat: 40.42, lon: -3.7, kind: 'travel', note: 'On stage in Madrid at TEDxCibeles, talking about redesigning the landscape.' },
  { id: 'romania', name: 'Romania', country: 'Europe', cc: 'RO', lat: 45.94, lon: 24.97, kind: 'travel' },
  { id: 'greece', name: 'Greece', country: 'Europe', cc: 'GR', lat: 39.07, lon: 21.82, kind: 'travel' },
  { id: 'netherlands', name: 'Netherlands', country: 'Europe', cc: 'NL', lat: 52.13, lon: 5.29, kind: 'travel' },
  { id: 'france', name: 'France', country: 'Europe', cc: 'FR', lat: 46.23, lon: 2.21, kind: 'travel' },
  { id: 'germany', name: 'Germany', country: 'Europe', cc: 'DE', lat: 51.17, lon: 10.45, kind: 'travel' },
  { id: 'italy', name: 'Italy', country: 'Europe', cc: 'IT', lat: 41.87, lon: 12.57, kind: 'travel' },
  { id: 'switzerland', name: 'Switzerland', country: 'Europe', cc: 'CH', lat: 46.82, lon: 8.23, kind: 'travel' },
  { id: 'georgia', name: 'Georgia', country: 'Caucasus', cc: 'GE', lat: 42.32, lon: 43.36, kind: 'travel' },
  { id: 'jordan', name: 'Jordan', country: 'Middle East', cc: 'JO', lat: 31.24, lon: 36.51, kind: 'travel' },
  { id: 'syria', name: 'Syria', country: 'Middle East', cc: 'SY', lat: 34.8, lon: 38.99, kind: 'travel' },
  { id: 'nepal', name: 'Nepal', country: 'Asia', cc: 'NP', lat: 28.39, lon: 84.12, kind: 'travel' },
  { id: 'philippines', name: 'Philippines', country: 'Asia', cc: 'PH', lat: 12.88, lon: 121.77, kind: 'travel' },
];
