/**
 * Animated thumbnails for the three services, drawn in code (SVG + CSS), so they weigh almost
 * nothing and match the site's colours in both themes. Each one loops slowly on its own and
 * plays a little livelier when the card is hovered; with reduced motion they hold a still frame.
 *
 * - strategy: a product flow mapping itself out, node by node
 * - ux: a phone screen laying itself out, then a tap that fills the button
 * - systems: a swatch cycling colours while every component updates with it
 */
import { CSSProperties } from 'react';

export type ServiceThumbKind = 'strategy' | 'ux' | 'systems';

function Strategy() {
  const nodes = [
    [34, 50], [86, 24], [86, 76], [138, 50], [190, 32],
  ];
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
  return (
    <svg className="sthumb sthumb--strategy" viewBox="0 0 224 100" aria-hidden="true">
      <g className="sthumb__grid">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={16 + i * 38} y1="8" x2={16 + i * 38} y2="92" />
        ))}
      </g>
      {links.map(([a, b], i) => (
        <line key={i} className="sthumb__link" style={{ '--i': i } as CSSProperties} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} pathLength={1} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} className={`sthumb__node ${i === 4 ? 'sthumb__node--end' : ''}`} style={{ '--i': i } as CSSProperties}>
          <circle cx={x} cy={y} r="7" />
          {i === 4 && <path d={`M${x - 3} ${y} l2 2 l4 -4`} className="sthumb__tick" />}
        </g>
      ))}
    </svg>
  );
}

function Ux() {
  return (
    <svg className="sthumb sthumb--ux" viewBox="0 0 224 100" aria-hidden="true">
      <rect className="sthumb__phone" x="82" y="4" width="60" height="112" rx="10" />
      <rect className="sthumb__block sthumb__block--a" x="90" y="16" width="24" height="5" rx="2.5" />
      <rect className="sthumb__block sthumb__block--b" x="90" y="26" width="44" height="22" rx="4" />
      <rect className="sthumb__block sthumb__block--c" x="90" y="53" width="20" height="14" rx="3" />
      <rect className="sthumb__block sthumb__block--d" x="114" y="53" width="20" height="14" rx="3" />
      <rect className="sthumb__block sthumb__block--e" x="90" y="72" width="44" height="14" rx="7" />
      <g className="sthumb__cursor">
        <path d="M0 0 L10 4 L5.5 5.5 L4 10 Z" />
      </g>
    </svg>
  );
}

function Systems() {
  return (
    <svg className="sthumb sthumb--systems" viewBox="0 0 224 100" aria-hidden="true">
      <circle className="sthumb__swatch" cx="36" cy="50" r="16" />
      <path className="sthumb__wire" d="M52 50 H74" />
      <g className="sthumb__comp">
        <rect x="80" y="18" width="58" height="16" rx="8" />
        <rect className="sthumb__inner" x="86" y="22" width="28" height="8" rx="4" />
      </g>
      <g className="sthumb__comp">
        <rect x="80" y="42" width="58" height="16" rx="4" />
        <rect className="sthumb__inner" x="86" y="46" width="40" height="8" rx="2" />
      </g>
      <g className="sthumb__comp">
        <rect className="sthumb__toggle" x="80" y="66" width="30" height="16" rx="8" />
        <circle className="sthumb__knob" cx="88" cy="74" r="6" />
      </g>
      <g className="sthumb__comp sthumb__comp--right">
        <rect x="148" y="18" width="60" height="64" rx="8" />
        <rect className="sthumb__inner" x="156" y="26" width="30" height="6" rx="3" />
        <rect className="sthumb__inner" x="156" y="38" width="44" height="6" rx="3" />
        <rect className="sthumb__inner" x="156" y="50" width="38" height="6" rx="3" />
        <rect className="sthumb__pill" x="156" y="62" width="26" height="12" rx="6" />
      </g>
    </svg>
  );
}

export function ServiceThumb({ kind }: { kind: ServiceThumbKind }) {
  return <div className={`sthumb-wrap sthumb-wrap--${kind}`}>{kind === 'strategy' ? <Strategy /> : kind === 'ux' ? <Ux /> : <Systems />}</div>;
}
