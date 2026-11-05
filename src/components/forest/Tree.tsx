/**
 * One tree, drawn as a flat generative silhouette. Its shape varies slightly with its id, so no
 * two trees in the forest are identical. `stage` drives the planting animation:
 * seed → sprout → grow → done (CSS in forest.css).
 */
import { CSSProperties, memo } from 'react';
import { rng } from './random';
import { PlantedTree } from './types';

export type Stage = 'seed' | 'sprout' | 'grow' | 'done';

/* ---- Drawing helpers: a tapered trunk, a few branches, layered foliage in three tones ---- */
type R = () => number;
const L = (i: number) => ({ className: 'tree__leaf', style: { '--i': i } as CSSProperties });

/** A trunk that tapers from base to top, with a slight lean and a soft shaded side. */
function Trunk({ r, top, baseW, lean = 0, bend = 0 }: { r: R; top: number; baseW: number; lean?: number; bend?: number }) {
  const bw = baseW + r() * 1.5;
  const tw = bw * 0.38;
  const cx = 50 + lean;
  const d = `M${50 - bw / 2} 140 Q${50 - bw / 2 + bend} ${(140 + top) / 2} ${cx - tw / 2} ${top} L${cx + tw / 2} ${top} Q${50 + bw / 2 + bend} ${(140 + top) / 2} ${50 + bw / 2} 140 Z`;
  return (
    <>
      <path className="tree__trunk" d={d} />
      <path className="tree__trunk tree__trunk--shade" d={`M${50 - bw / 2} 140 Q${50 - bw / 2 + bend} ${(140 + top) / 2} ${cx - tw / 2} ${top} L${cx - tw / 2 + tw * 0.4} ${top} Q${50 - bw / 2 + bend + bw * 0.35} ${(140 + top) / 2} ${50 - bw / 2 + bw * 0.4} 140 Z`} />
      {/* root flare */}
      <path className="tree__trunk" d={`M${50 - bw / 2 - 3} 140 Q${50 - bw / 2} 136 ${50 - bw / 2} 132 L${50 + bw / 2} 132 Q${50 + bw / 2} 136 ${50 + bw / 2 + 3} 140 Z`} />
    </>
  );
}

/** Branches: a handful of tapered strokes fanning out from the trunk. */
function Branches({ r, from, n, spread, length }: { r: R; from: [number, number]; n: number; spread: number; length: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + ((i / (n - 1 || 1)) - 0.5) * spread + (r() - 0.5) * 0.4;
        const len = length * (0.7 + r() * 0.5);
        const ex = from[0] + Math.cos(a) * len;
        const ey = from[1] + Math.sin(a) * len;
        const mx = from[0] + Math.cos(a) * len * 0.5 + (r() - 0.5) * 6;
        const my = from[1] + Math.sin(a) * len * 0.5;
        return <path key={i} className="tree__branch" d={`M${from[0]} ${from[1]} Q${mx} ${my} ${ex} ${ey}`} style={{ strokeWidth: 1.2 + r() * 1.2 }} />;
      })}
    </>
  );
}

function Oak({ r }: { r: R }) {
  const lean = (r() - 0.5) * 4;
  const top = 92;
  // canopy: a cloud of overlapping discs in three tones, darker low and left, lighter high and right
  const discs: [number, number, number, number][] = [];
  const n = 34 + Math.floor(r() * 8);
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 28;
    const x = 50 + lean + Math.cos(a) * d * 1.15;
    const y = 58 + Math.sin(a) * d * 0.8;
    const size = 5 + r() * 8;
    const tone = y > 66 || x < 40 ? 0 : y < 50 && x > 50 ? 2 : 1;
    discs.push([x, y, size, tone]);
  }
  discs.sort((p, q) => p[3] - q[3]);
  return (
    <>
      <Trunk r={r} top={top} baseW={7} lean={lean} />
      <Branches r={r} from={[50 + lean, top + 2]} n={4} spread={1.9} length={22} />
      <g className="tree__crown">
        {discs.map(([x, y, s, t], i) => (
          <circle key={i} {...L(i)} className={`tree__leaf tree__leaf--t${t}`} cx={x} cy={y} r={s} />
        ))}
      </g>
    </>
  );
}

function Pine({ r }: { r: R }) {
  const top = 24 + r() * 8;
  const tiers = 6 + Math.floor(r() * 3);
  const out = [];
  for (let i = 0; i < tiers; i++) {
    const t = i / (tiers - 1); // 0 = bottom
    const y = 118 - t * (118 - top - 8);
    const w = 30 * (1 - t * 0.8) + r() * 3;
    const h = 16 + r() * 5;
    const droop = 3 + r() * 3;
    // a ragged, slightly drooping tier: a path with a few points along the lower edge
    const pts = [];
    const segs = 5;
    for (let k = 0; k <= segs; k++) {
      const x = 50 - w + (k / segs) * 2 * w;
      const jag = k === 0 || k === segs ? 0 : (r() - 0.5) * 5;
      const sag = Math.sin((k / segs) * Math.PI) * -droop * 0.3;
      pts.push(`${x.toFixed(1)} ${(y + jag + sag + (k % 2 ? 2.5 : 0)).toFixed(1)}`);
    }
    const tone = i < 2 ? 0 : i < tiers - 2 ? 1 : 2;
    out.push(<path key={i} {...L(i)} className={`tree__leaf tree__leaf--t${tone}`} d={`M${50 + (r() - 0.5) * 2} ${y - h} L${pts.join(' L')} Z`} />);
    // a darker underside on the left half of each tier
    out.push(<path key={'s' + i} {...L(i)} className="tree__leaf tree__leaf--t0" style={{ '--i': i, opacity: 0.55 } as CSSProperties} d={`M${50} ${y - h} L${(50 - w).toFixed(1)} ${y} L${50} ${y - 1} Z`} />);
  }
  return (
    <>
      <Trunk r={r} top={top + 12} baseW={5.5} />
      <g className="tree__crown">{out}</g>
    </>
  );
}

function Olive({ r }: { r: R }) {
  const lean = (r() - 0.5) * 12;
  // a gnarled, twisting trunk drawn as a thick stroked path
  const trunk = `M48 140 Q${44 + lean * 0.3} 118 ${50 + lean * 0.6} 104 Q${54 + lean} 92 ${48 + lean} 82`;
  const limbs = [
    `M${50 + lean * 0.6} 104 Q${36 + lean * 0.6} 94 ${30 + lean * 0.6} 80`,
    `M${50 + lean * 0.6} 100 Q${64 + lean} 92 ${72 + lean} 82`,
    `M${48 + lean} 82 Q${44 + lean} 72 ${52 + lean} 62`,
  ];
  // airy foliage: many small, narrow leaf clusters around the limb ends
  const ends: [number, number][] = [[30 + lean * 0.6, 80], [72 + lean, 82], [52 + lean, 62], [48 + lean, 84]];
  const leaves: [number, number, number, number, number][] = [];
  ends.forEach(([ex, ey]) => {
    const n = 9 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 14;
      const long = 4.5 + r() * 3.5;
      const short = 2.4 + r() * 1.4;
      const flip = r() > 0.5;
      leaves.push([ex + Math.cos(a) * d * 1.2, ey + Math.sin(a) * d * 0.9, flip ? long : short, flip ? short : long, 0]);
    }
  });
  return (
    <>
      <path className="tree__trunk tree__trunk--line" d={trunk} style={{ strokeWidth: 7 }} />
      {limbs.map((d, i) => (
        <path key={i} className="tree__trunk tree__trunk--line" d={d} style={{ strokeWidth: 3.2 - i * 0.4 }} />
      ))}
      <g className="tree__crown">
        {leaves.map(([x, y, rx, ry, rot], i) => (
          <ellipse key={i} {...L(i)} className={`tree__leaf tree__leaf--t${i % 3}`} cx={x} cy={y} rx={rx} ry={ry} data-r={rot} />
        ))}
      </g>
    </>
  );
}

function Palm({ r }: { r: R }) {
  const bend = 8 + r() * 12;
  const top = { x: 50 + bend, y: 38 };
  // trunk as a curved stroke with ring marks
  const trunk = `M48 140 Q${49 + bend * 0.25} 95 ${top.x} ${top.y + 4}`;
  const rings = Array.from({ length: 9 }, (_, i) => {
    const t = (i + 1) / 10;
    const x = 48 + (top.x - 48) * t * t;
    const y = 140 - (140 - top.y - 4) * t;
    return <path key={i} className="tree__trunk tree__trunk--ring" d={`M${x - 3} ${y} L${x + 3} ${y - 1}`} />;
  });
  // fronds: each a spine with leaflets on both sides (a zigzag-edged shape)
  const fronds = [-160, -130, -100, -70, -40, -10, 20].map((deg, i) => {
    const a = ((deg + (r() - 0.5) * 14) * Math.PI) / 180;
    const len = 40 + r() * 10;
    const pts: string[] = [];
    const back: string[] = [];
    const segs = 13;
    for (let k = 0; k <= segs; k++) {
      const t = k / segs;
      const sag = t * t * 16; // fronds droop towards the tip
      const x = top.x + Math.cos(a) * len * t;
      const y = top.y + Math.sin(a) * len * t * 0.85 + sag;
      const w = Math.sin(t * Math.PI) * (9 + r() * 2);
      const nx = -Math.sin(a) * w;
      const ny = Math.cos(a) * w;
      const serr = k % 2 ? 1 : 0.7;
      pts.push(`${(x + nx * serr).toFixed(1)} ${(y + ny * serr).toFixed(1)}`);
      back.unshift(`${(x - nx * serr).toFixed(1)} ${(y - ny * serr).toFixed(1)}`);
    }
    const tone = deg < -120 || deg > 0 ? 0 : deg < -50 ? 2 : 1;
    return <path key={i} {...L(i)} className={`tree__leaf tree__leaf--t${tone}`} d={`M${pts.join(' L')} L${back.join(' L')} Z`} />;
  });
  return (
    <>
      <path className="tree__trunk tree__trunk--line" d={trunk} style={{ strokeWidth: 5 }} />
      {rings}
      <g className="tree__crown">
        {fronds}
        <circle className="tree__trunk" cx={top.x} cy={top.y + 2} r="3.2" />
      </g>
    </>
  );
}

const DRAW = { pine: Pine, oak: Oak, olive: Olive, palm: Palm };

export const Tree = memo(function Tree({ tree, stage = 'done', mine = false }: { tree: PlantedTree; stage?: Stage; mine?: boolean }) {
  const r = rng(tree.id);
  const Shape = DRAW[tree.kind];
  const scale = [0.55, 0.78, 1][tree.row] * (0.88 + r() * 0.24);
  return (
    <div
      className={`tree tree--${tree.kind} tree--row${tree.row} ${mine ? 'tree--mine' : ''}`}
      data-stage={stage}
      style={{ left: `${tree.x}%`, '--s': scale, '--sway-d': `${4.5 + r() * 3}s`, '--sway-delay': `${-r() * 6}s` } as CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 140" className="tree__svg">
        <g className="tree__body">
          <Shape r={r} />
        </g>
        <g className="tree__sprout">
          <path d="M50 140 L50 128" />
          <path d="M50 131 Q43 126 41 130 Q45 134 50 131 Z" />
          <path d="M50 129 Q57 123 60 127 Q55 132 50 129 Z" />
        </g>
        <circle className="tree__seed" cx="50" cy="137" r="3" />
      </svg>
      {mine && stage === 'done' && <span className="tree__tag">Your tree</span>}
    </div>
  );
});

/** Small icon versions for the choice buttons */
export function TreeIcon({ kind }: { kind: PlantedTree['kind'] }) {
  const Shape = DRAW[kind];
  const r = rng('icon-' + kind);
  return (
    <svg viewBox="0 0 100 140" className="tree-icon" aria-hidden="true">
      <Shape r={r} />
    </svg>
  );
}
