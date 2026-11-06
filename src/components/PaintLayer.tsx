import { useEffect, useRef } from 'react';

/**
 * "I also paint cities": the visitor paints across the teaser with their pointer.
 * A canvas sits behind the text and the photo stack. Moving a mouse or pen over the card lays down a
 * bristly brush stroke that cycles through the Dihzahyners stair colours; quick flicks throw splatters.
 * The paint stays while you play, then dries away a few seconds after you stop, so the card is clean
 * again for the next visit. The cursor becomes a paintbrush dipped in the current colour.
 * Touch is left alone (a tap still opens the gallery), and nothing is drawn until someone moves.
 */
const PAINTS = ['#ffc23d', '#ff6b5b', '#ff5fa2', '#a77bff', '#3fa9f5', '#19c3a6', '#56e38b'];

const brushCursor = (c: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
<g transform='rotate(45 20 20)'>
<rect x='17' y='-2' width='6' height='20' rx='3' fill='#2a2420'/>
<rect x='16' y='17' width='8' height='6' rx='1.2' fill='#c9ccd1' stroke='#2a2420' stroke-width='1'/>
<path d='M16 23 h8 c0 6 -1.6 11 -4 15 c-2.4 -4 -4 -9 -4 -15 z' fill='${c}' stroke='#2a2420' stroke-width='1'/>
</g></svg>`;
  // the hotspot is the brush tip (bottom-left once rotated)
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 4 36, crosshair`;
};

export function PaintLayer({ host }: { host: React.RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    // skip the canvas on low-memory devices
    if ((navigator as Navigator & { deviceMemory?: number }).deviceMemory && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4) return;

    const dpr = Math.min(1.5, devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const size = () => {
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    let colourIndex = Math.floor(Math.random() * PAINTS.length);
    let colour = PAINTS[colourIndex];
    let travelled = 0;
    let last: { x: number; y: number; t: number } | null = null;
    let mid: { x: number; y: number } | null = null;
    let width = 14;
    let idleTimer = 0;
    let fadeRaf = 0;
    let painted = false;

    const setCursor = () => { el.style.cursor = brushCursor(colour); };
    setCursor();

    const splat = (x: number, y: number, power: number, dx: number, dy: number) => {
      const n = 3 + Math.floor(Math.random() * 4 * power);
      ctx.fillStyle = colour;
      for (let i = 0; i < n; i++) {
        const spread = 10 + Math.random() * 46 * power;
        const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.6;
        const px = x + Math.cos(a) * spread;
        const py = y + Math.sin(a) * spread;
        const r = 1.2 + Math.random() * 4.5 * Math.min(1.4, power);
        ctx.globalAlpha = 0.75 + Math.random() * 0.25;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const stroke = (from: { x: number; y: number }, ctrl: { x: number; y: number }, to: { x: number; y: number }, lw: number) => {
      // a main stroke plus two thin bristle trails either side, for a hand-painted edge
      const nx = to.y - from.y;
      const ny = -(to.x - from.x);
      const len = Math.hypot(nx, ny) || 1;
      const ox = (nx / len) * lw * 0.42;
      const oy = (ny / len) * lw * 0.42;
      ctx.strokeStyle = colour;
      ctx.globalAlpha = 0.92;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(ctrl.x, ctrl.y, to.x, to.y);
      ctx.stroke();
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = Math.max(1, lw * 0.16);
      for (const s of [1, -1]) {
        ctx.beginPath();
        ctx.moveTo(from.x + ox * s, from.y + oy * s);
        ctx.quadraticCurveTo(ctrl.x + ox * s * 1.15, ctrl.y + oy * s * 1.15, to.x + ox * s, to.y + oy * s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    // the paint dries away a few seconds after the last stroke
    const dry = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      fadeFrames++;
      if (fadeFrames < 70) fadeRaf = requestAnimationFrame(dry);
      else { ctx.clearRect(0, 0, w, h); painted = false; }
    };
    let fadeFrames = 0;
    const scheduleDry = () => {
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { fadeFrames = 0; cancelAnimationFrame(fadeRaf); fadeRaf = requestAnimationFrame(dry); }, 3200);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      cancelAnimationFrame(fadeRaf);
      const r = el.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top, t: e.timeStamp };
      if (!last) { last = p; mid = { x: p.x, y: p.y }; return; }
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1.5) return;
      const speed = dist / Math.max(8, p.t - last.t); // px per ms
      // faster strokes get thinner, slow strokes pool into fat paint
      const target = Math.max(5, Math.min(26, 24 - speed * 9));
      width += (target - width) * 0.25;
      const nextMid = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
      stroke(mid!, last, nextMid, width);
      if (speed > 1.6 && Math.random() < 0.55) splat(p.x, p.y, Math.min(2, speed / 1.6), dx, dy);
      mid = nextMid;
      last = p;
      travelled += dist;
      if (travelled > 170) {
        // dip the brush in the next colour of the stairs
        travelled = 0;
        colourIndex = (colourIndex + 1) % PAINTS.length;
        colour = PAINTS[colourIndex];
        setCursor();
      }
      if (!painted) { painted = true; hintRef.current?.classList.add('is-gone'); }
      scheduleDry();
    };
    const onLeave = () => { last = null; mid = null; };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      // a little splash as the brush arrives
      splat(e.clientX - r.left, e.clientY - r.top, 0.8, Math.random() - 0.5, Math.random() - 0.5);
      scheduleDry();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerenter', onEnter);
    return () => {
      ro.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerenter', onEnter);
      clearTimeout(idleTimer);
      cancelAnimationFrame(fadeRaf);
      el.style.cursor = '';
    };
  }, [host]);

  return (
    <>
      <canvas ref={canvasRef} className="paint-layer" aria-hidden="true" />
      <span ref={hintRef} className="paint-hint" aria-hidden="true">
        <span className="paint-hint__dot" /> Move your cursor to paint
      </span>
    </>
  );
}
