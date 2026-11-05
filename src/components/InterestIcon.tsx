/**
 * Small line icons for "A few things I'm into", each with its own tiny animation
 * (see the .fun rules in pages.css). They idle gently on their own and play a bigger
 * move when the card is hovered or focused:
 * - travel: the airliner cruises past drifting clouds; on hover it flies off and loops back in
 * - food: the burger's layers bounce and restack
 * - movies: the clapperboard snaps shut, popcorn pops
 * - photography: the drone hovers, its propellers spin up, and the camera flashes
 */
export function InterestIcon({ name }: { name: 'travel' | 'food' | 'movies' | 'photography' | 'globe' }) {
  const common = { viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'globe')
    // a small globe that keeps turning: meridians slide across the sphere behind a circular mask
    return (
      <svg {...common}>
        <defs>
          <clipPath id="ic-globe-clip">
            <circle cx="32" cy="32" r="20" />
          </clipPath>
        </defs>
        <circle cx="32" cy="32" r="20" fill="var(--fun-fill)" />
        <g clipPath="url(#ic-globe-clip)">
          <g className="ic-meridians">
            {[-24, -8, 8, 24, 40, 56, 72].map((x) => (
              <path key={x} d={`M${x} 10 C ${x - 6} 24, ${x - 6} 40, ${x} 54`} />
            ))}
          </g>
          <path d="M12 32 H52" />
          <path d="M15 22 C 24 25, 40 25, 49 22" />
          <path d="M15 42 C 24 39, 40 39, 49 42" />
        </g>
        <circle cx="32" cy="32" r="20" />
        <g className="ic-pin">
          <path d="M44 8 c0 4 -4 6 -4 6 s-4 -2 -4 -6 a4 4 0 0 1 8 0 Z" fill="var(--fun-fill)" />
        </g>
      </svg>
    );
  if (name === 'travel')
    // a side-on airliner cruising past two clouds; on hover it flies off one side and back in the other
    return (
      <svg {...common}>
        <path className="ic-cloud ic-cloud--a" d="M42 20 h12 a4 4 0 0 0 0-8 a6 6 0 0 0-11.5 1.5 A3.5 3.5 0 0 0 42 20 Z" fill="var(--fun-fill)" />
        <path className="ic-cloud ic-cloud--b" d="M10 52 h10 a3.4 3.4 0 0 0 0-6.8 a5 5 0 0 0-9.6 1.2 A3 3 0 0 0 10 52 Z" fill="var(--fun-fill)" />
        <g className="ic-jet">
          <path d="M10 30 c0-2.2 1.6-4 4-4 h28 c5 0 10 2.6 12 5 c-2 2.4-7 5-12 5 H16 c-3.5 0-6-2.6-6-6 Z" fill="var(--fun-fill)" />
          <path d="M14 26 l-3-8 h5 l6 8" />
          <path d="M28 33 l-6 9 h5 l10-9" />
          <path d="M42 29 h4" />
          <circle cx="24" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="29" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="34" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="39" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
        </g>
      </svg>
    );
  if (name === 'food')
    return (
      <svg {...common}>
        <path className="ic-bun-top" d="M14 30 C 14 18, 50 18, 50 30 Z" fill="var(--fun-fill)" />
        <path className="ic-lettuce" d="M12 35 q4 -4 8 0 t8 0 t8 0 t8 0 t8 0" />
        <rect className="ic-patty" x="13" y="39" width="38" height="6" rx="3" />
        <path className="ic-bun-bottom" d="M14 49 H50 a2 2 0 0 1 -2 4 H16 a2 2 0 0 1 -2 -4 Z" />
        <g className="ic-seeds">
          <path d="M26 24 l2 -1" />
          <path d="M34 22 l2 1" />
          <path d="M40 26 l1 -2" />
        </g>
      </svg>
    );
  if (name === 'movies')
    return (
      <svg {...common}>
        <rect x="12" y="28" width="40" height="24" rx="3" fill="var(--fun-fill)" />
        <g className="ic-clap">
          <path d="M12 26 L50 18 L52 24 L14 32 Z" />
          <path d="M22 24 L26 30 M32 22 L36 28 M42 20 L46 26" />
        </g>
        <path d="M24 38 L24 46 L32 42 Z" />
        <g className="ic-pop">
          <circle cx="50" cy="12" r="2.4" />
          <circle cx="57" cy="18" r="1.8" />
        </g>
      </svg>
    );
  // photography: a small camera drone
  return (
    <svg {...common}>
      <g className="ic-drone">
        <path d="M18 22 L28 29 M46 22 L36 29 M18 42 L28 35 M46 42 L36 35" />
        <rect x="26" y="26" width="12" height="12" rx="3" fill="var(--fun-fill)" />
        {[
          [16, 20],
          [48, 20],
          [16, 44],
          [48, 44],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} className="ic-rotor" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <path d={`M${cx - 8} ${cy} H${cx + 8}`} />
            <circle cx={cx} cy={cy} r="1.6" fill="currentColor" />
          </g>
        ))}
        <circle className="ic-lens" cx="32" cy="32" r="2.6" />
        <path className="ic-flash" d="M32 46 L32 52 M26 48 L24 53 M38 48 L40 53" />
      </g>
    </svg>
  );
}
