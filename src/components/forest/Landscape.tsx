/**
 * The landscape: a quiet horizon with three depth rows of trees. The pointer adds a very light
 * parallax and a breath of wind; both stop when the pointer leaves or motion is reduced.
 */
import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { Stage, Tree } from './Tree';
import { PlantedTree } from './types';
import { rng } from './random';

/**
 * Where trees stand. Trees are shown side by side in the order they were planted, never one
 * behind another: the front row fills first, evenly spaced with a little natural unevenness,
 * and only when a row is full does the next tree start the row behind. (Stored positions are
 * ignored, so older trees line up too.)
 */
const ROW_CAPACITY = [7, 9, 11]; // far, middle, near (how many fit per row before using the next)
const EDGE = 5; // % of width kept clear at each side
const MAX_SPACING = 13; // % of width; closer than this only when a row is getting full

export function layout(trees: PlantedTree[], narrow: boolean): (PlantedTree & { lx: number; lrow: 0 | 1 | 2 })[] {
  const cap = narrow ? ROW_CAPACITY.map((c) => Math.ceil(c * 0.55)) : ROW_CAPACITY;
  const ordered = [...trees].sort((a, b) => a.at - b.at);
  const rows: PlantedTree[][] = [[], [], []];
  for (const t of ordered) {
    const row = rows[2].length < cap[2] ? 2 : rows[1].length < cap[1] ? 1 : rows[0].length < cap[0] ? 0 : 2;
    rows[row].push(t);
  }
  const out: (PlantedTree & { lx: number; lrow: 0 | 1 | 2 })[] = [];
  rows.forEach((list, row) => {
    const n = list.length;
    if (!n) return;
    const span = 100 - EDGE * 2;
    const spacing = n === 1 ? 0 : Math.min(MAX_SPACING, span / (n - 1));
    const start = 50 - (spacing * (n - 1)) / 2;
    // Rows behind are offset by half a step so they peek out between the trees in front
    const shift = row === 2 ? 0 : row === 1 ? spacing * 0.5 : spacing * 0.25;
    list.forEach((t, i) => {
      const jitter = (rng('x' + t.id)() - 0.5) * Math.min(3, spacing * 0.2);
      const x = Math.max(EDGE, Math.min(100 - EDGE, start + i * spacing + shift + jitter));
      out.push({ ...t, lx: Math.round(x * 10) / 10, lrow: row as 0 | 1 | 2 });
    });
  });
  return out;
}

export function Landscape({
  trees,
  mine,
  growing,
  stage,
  highlight,
  children,
  label,
}: {
  trees: PlantedTree[];
  mine: string | null;
  growing: string | null;
  stage: Stage;
  highlight: boolean;
  children?: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, x = 0, gust = 0, last = 0, lastX = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      gust *= 0.94;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--gust', gust.toFixed(2));
      raf = Math.abs(tx - x) > 0.002 || Math.abs(gust) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const now = performance.now();
      const v = (e.clientX - lastX) / Math.max(16, now - last);
      gust = Math.max(-3, Math.min(3, gust + v * 0.9));
      last = now;
      lastX = e.clientX;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      tx = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  const narrow = typeof window !== 'undefined' && window.innerWidth < 760;
  const placed = layout(trees, narrow);
  const rows: (0 | 1 | 2)[] = [0, 1, 2];
  return (
    <div ref={ref} className={`forest ${highlight ? 'forest--find' : ''}`} role="img" aria-label={label}>
      <svg className="forest__hills" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 140 C 160 96, 300 120, 460 104 S 760 70, 920 96 S 1120 118, 1200 92 L1200 200 L0 200 Z" />
      </svg>
      <div className="forest__horizon" aria-hidden="true" />
      {rows.map((row) => (
        <div key={row} className={`forest__row forest__row--${row}`} style={{ '--depth': row } as CSSProperties}>
          {placed
            .filter((t) => t.lrow === row)
            .map((t) => (
              <Tree key={t.id} tree={{ ...t, x: t.lx, row: t.lrow }} mine={t.id === mine} stage={t.id === growing ? stage : 'done'} />
            ))}
        </div>
      ))}
      <div className="forest__ground" aria-hidden="true" />
      {children}
    </div>
  );
}
