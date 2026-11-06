/**
 * "Places that shaped me": an interactive dotted globe on the About page.
 * - Drawn on a canvas with a hand-rolled orthographic projection; the land is ~4,200 precomputed
 *   dots (src/content/globe-dots.json, made by scripts/globe-dots.mjs), so there's no map library at runtime.
 * - Drag (mouse or touch) to spin it, with inertia; it turns slowly on its own when left alone.
 * - Markers are coloured by kind (lived, travelled, studied); hovering shows a label, clicking (or picking
 *   a place from the list) flies the globe to it and opens its story in the side card.
 * - Soft arcs link home to the other places. Everything pauses when the section is off screen.
 */
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import dots from '../content/globe-dots.json';
import { HOME_ID, Place, PlaceKind, journeyIntro, places } from '../content/journey';

const KIND_COLOR: Record<PlaceKind, string> = { lived: '#2fbf71', travel: '#3fa9f5', studied: '#a77bff' };
const KIND_SHORT: Record<PlaceKind, string> = { lived: 'Lived', travel: 'Travelled', studied: 'Studied' };
const RAD = Math.PI / 180;

type View = { lon: number; lat: number };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** a country code as its flag emoji (two regional-indicator letters) */
const flag = (cc: string) => String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/** the three categories, in the order they're shown */
const GROUPS: PlaceKind[] = ['studied', 'lived', 'travel'];
const GROUP_TITLE: Record<PlaceKind, string> = { travel: 'Where I’ve travelled', lived: 'Where I’ve lived', studied: 'Where I’ve studied' };

export function JourneyGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  // one view at a time: everything, or a single kind (filters both the globe and the list)
  // one category open at a time (or none: then the globe shows everything)
  const [tab, setTab] = useState<'all' | PlaceKind>('all');
  const active: Record<PlaceKind, boolean> = useMemo(
    () => ({ lived: tab === 'all' || tab === 'lived', travel: tab === 'all' || tab === 'travel', studied: tab === 'all' || tab === 'studied' }),
    [tab],
  );
  const [selected, setSelected] = useState<Place | null>(null);
  const [hovered, setHovered] = useState<Place | null>(null);

  // shared, mutable state for the render loop (kept out of React to avoid re-renders per frame)
  const st = useRef({
    view: { lon: -30, lat: -18 } as View,
    vel: { lon: 0, lat: 0 },
    drag: null as null | { x: number; y: number; view: View },
    fly: null as null | { from: View; to: View; t0: number; dur: number },
    visible: false,
    hoverId: '' as string,
    selId: '' as string,
    active: { lived: true, travel: true, studied: true } as Record<PlaceKind, boolean>,
    lastInteract: 0,
    dirty: true,
  });


  useEffect(() => {
    st.current.active = active;
    st.current.dirty = true;
  }, [active]);
  useEffect(() => {
    st.current.selId = selected?.id ?? '';
    st.current.dirty = true;
  }, [selected]);

  const flyTo = (p: Place) => {
    const s = st.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // shortest way round in longitude
    let to = -p.lon;
    while (to - s.view.lon > 180) to -= 360;
    while (to - s.view.lon < -180) to += 360;
    const target = { lon: to, lat: -Math.max(-55, Math.min(55, p.lat)) };
    s.vel = { lon: 0, lat: 0 };
    if (reduced) {
      s.view = target;
      s.dirty = true;
    } else s.fly = { from: { ...s.view }, to: target, t0: performance.now(), dur: 1100 };
    s.lastInteract = performance.now();
  };

  const select = (p: Place) => {
    setTab(p.kind);
    setSelected(p);
    flyTo(p);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = st.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, devicePixelRatio || 1);
    let size = 0;
    let colors = { ink: '#141414', surface: '#ffffff', line: 'rgba(0,0,0,.12)', bg: '#f3f3f2' };
    const readColors = () => {
      const cs = getComputedStyle(wrap);
      colors = {
        ink: cs.getPropertyValue('--c-ink').trim() || '#141414',
        surface: cs.getPropertyValue('--c-surface').trim() || '#fff',
        line: cs.getPropertyValue('--c-line').trim() || 'rgba(0,0,0,.12)',
        bg: cs.getPropertyValue('--c-bg').trim() || '#f3f3f2',
      };
      s.dirty = true;
    };
    const resize = () => {
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.dirty = true;
    };
    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', readColors);

    const dotArr = dots as number[];
    // project [lon, lat] for the current view: returns [x, y, depth] (depth > 0 = facing us)
    const project = (lon: number, lat: number, R: number, alt = 1): [number, number, number] => {
      const l0 = -s.view.lon * RAD;
      const p0 = -s.view.lat * RAD;
      const l = lon * RAD;
      const p = lat * RAD;
      const cosp = Math.cos(p);
      const dl = l - l0;
      const x = cosp * Math.sin(dl);
      const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * cosp * Math.cos(dl);
      const z = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * cosp * Math.cos(dl);
      const c = size / 2;
      return [c + x * R * alt, c - y * R * alt, z];
    };

    const home = places.find((p) => p.id === HOME_ID);
    // points along the great circle between two places, lifted into an arc
    const arcPoints = (a: Place, b: Place) => {
      const toV = (p: Place) => [Math.cos(p.lat * RAD) * Math.cos(p.lon * RAD), Math.cos(p.lat * RAD) * Math.sin(p.lon * RAD), Math.sin(p.lat * RAD)];
      const va = toV(a), vb = toV(b);
      const dot = Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
      const w = Math.acos(dot);
      const pts: [number, number, number][] = [];
      const n = 48;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const k1 = w < 1e-6 ? 1 - t : Math.sin((1 - t) * w) / Math.sin(w);
        const k2 = w < 1e-6 ? t : Math.sin(t * w) / Math.sin(w);
        const v = [va[0] * k1 + vb[0] * k2, va[1] * k1 + vb[1] * k2, va[2] * k1 + vb[2] * k2];
        const lat = Math.asin(v[2]) / RAD;
        const lon = Math.atan2(v[1], v[0]) / RAD;
        pts.push([lon, lat, 1 + Math.sin(t * Math.PI) * Math.min(0.22, w * 0.18)]);
      }
      return pts;
    };
    const arcs = home ? places.filter((p) => p.id !== HOME_ID && p.kind === 'travel').map((p) => ({ p, pts: arcPoints(home, p) })) : [];

    let markerScreen: { p: Place; x: number; y: number; z: number }[] = [];

    const draw = (now: number) => {
      const R = size * 0.44;
      const c = size / 2;
      ctx.clearRect(0, 0, size, size);

      // sphere: soft fill, a gentle light from top-left and a thin rim
      const g = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      g.addColorStop(0, colors.surface);
      g.addColorStop(1, colors.bg);
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.stroke();

      // land dots, fading toward the edge for depth
      ctx.fillStyle = colors.ink;
      const r = Math.max(0.8, size / 520);
      for (let i = 0; i < dotArr.length; i += 2) {
        const [x, y, z] = project(dotArr[i], dotArr[i + 1], R);
        if (z <= 0.02) continue;
        ctx.globalAlpha = 0.12 + z * 0.42;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;

      // arcs from home to travelled places, with a drifting dash
      if (s.active.travel) {
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 5]);
        ctx.lineDashOffset = reduced ? 0 : -(now / 60) % 9;
        arcs.forEach(({ p, pts }) => {
          ctx.strokeStyle = KIND_COLOR[p.kind];
          ctx.globalAlpha = s.selId && s.selId !== p.id && s.selId !== HOME_ID ? 0.25 : 0.8;
          ctx.beginPath();
          let pen = false;
          for (const [lon, lat, alt] of pts) {
            const [x, y, z] = project(lon, lat, R, alt);
            if (z > -0.15) {
              if (!pen) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
              pen = true;
            } else pen = false;
          }
          ctx.stroke();
        });
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // markers
      markerScreen = [];
      const pulse = reduced ? 0 : (now % 2400) / 2400;
      places.forEach((p) => {
        if (!s.active[p.kind]) return;
        const [x, y, z] = project(p.lon, p.lat, R);
        if (z <= 0.05) return;
        markerScreen.push({ p, x, y, z });
        const col = KIND_COLOR[p.kind];
        const on = s.hoverId === p.id || s.selId === p.id;
        const base = on ? 7 : 5;
        // expanding halo
        ctx.beginPath();
        ctx.arc(x, y, base + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = col;
        ctx.globalAlpha = (1 - pulse) * 0.55 * z;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        // dot with a light ring so it reads on any colour
        ctx.beginPath();
        ctx.arc(x, y, base, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.surface;
        ctx.stroke();
        if (s.hoverId === p.id && tipRef.current) tipRef.current.style.transform = `translate(${x}px, ${y}px)`;
      });
      // the hovered place rotated out of view: hide its label
      if (s.hoverId && !markerScreen.some((m) => m.p.id === s.hoverId)) {
        s.hoverId = '';
        setHovered(null);
      }
    };

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!s.visible) return;
      const dt = Math.min(48, now - last);
      last = now;
      let moving = false;
      if (s.fly) {
        const t = Math.min(1, (now - s.fly.t0) / s.fly.dur);
        const e = ease(t);
        s.view = { lon: s.fly.from.lon + (s.fly.to.lon - s.fly.from.lon) * e, lat: s.fly.from.lat + (s.fly.to.lat - s.fly.from.lat) * e };
        if (t >= 1) s.fly = null;
        moving = true;
      } else if (!s.drag) {
        if (Math.abs(s.vel.lon) + Math.abs(s.vel.lat) > 0.002) {
          s.view.lon += s.vel.lon * dt;
          s.view.lat = Math.max(-60, Math.min(60, s.view.lat + s.vel.lat * dt));
          s.vel.lon *= 0.94;
          s.vel.lat *= 0.94;
          moving = true;
        } else if (!reduced && !s.selId && now - s.lastInteract > 2500) {
          s.view.lon += 0.004 * dt; // slow idle spin
          moving = true;
        }
      }
      // the arcs' dash and the marker pulse animate continuously while visible
      if (moving || s.dirty || !reduced) {
        draw(now);
        s.dirty = false;
      }
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
      s.dirty = true;
    });
    io.observe(canvas);

    // pointer: drag to rotate, hover for labels, click to select
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const hitTest = (x: number, y: number) => {
      let best: { p: Place; d: number } | null = null;
      for (const m of markerScreen) {
        const d = Math.hypot(m.x - x, m.y - y);
        if (d < 16 && (!best || d < best.d)) best = { p: m.p, d };
      }
      return best?.p ?? null;
    };
    let downAt = { x: 0, y: 0, t: 0 };
    let lastMove = { x: 0, y: 0, t: 0 };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      downAt = { ...p, t: performance.now() };
      lastMove = { ...downAt };
      s.drag = { x: p.x, y: p.y, view: { ...s.view } };
      if (s.hoverId) {
        s.hoverId = '';
        setHovered(null);
      }
      s.fly = null;
      s.vel = { lon: 0, lat: 0 };
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      if (s.drag) {
        const k = 180 / (size * 0.9);
        s.view = { lon: s.drag.view.lon + (p.x - s.drag.x) * k, lat: Math.max(-60, Math.min(60, s.drag.view.lat - (p.y - s.drag.y) * k)) };
        const now = performance.now();
        const dt = Math.max(1, now - lastMove.t);
        s.vel = { lon: ((p.x - lastMove.x) * k) / dt, lat: (-(p.y - lastMove.y) * k) / dt };
        lastMove = { ...p, t: now };
        s.lastInteract = now;
        s.dirty = true;
        return;
      }
      const hit = hitTest(p.x, p.y);
      const id = hit?.id ?? '';
      if (id !== s.hoverId) {
        s.hoverId = id;
        s.dirty = true;
        setHovered(hit);
      }
      canvas.style.cursor = hit ? 'pointer' : 'grab';
      const tip = tipRef.current;
      if (tip && hit) {
        const m = markerScreen.find((mm) => mm.p.id === hit.id);
        if (m) tip.style.transform = `translate(${m.x}px, ${m.y}px)`;
      }
    };
    const onUp = (e: PointerEvent) => {
      const p = local(e);
      const moved = Math.hypot(p.x - downAt.x, p.y - downAt.y);
      s.drag = null;
      canvas.classList.remove('is-dragging');
      if (moved < 5) {
        const hit = hitTest(p.x, p.y);
        if (hit) select(hit);
      }
    };
    const onLeave = () => {
      if (s.hoverId) {
        s.hoverId = '';
        s.dirty = true;
        setHovered(null);
      }
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      mq.removeEventListener('change', readColors);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleKind = (k: PlaceKind) => {
    setTab((t) => (t === k ? 'all' : k));
    setSelected(null);
  };

  return (
    <section className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <p className="kicker">{journeyIntro.eyebrow}</p>
        <h2 id="journey-title" className="section-title journey__title">
          {journeyIntro.title}
        </h2>
        <div className="journey__grid">
          <div ref={wrapRef} className="journey__globe">
            <canvas ref={canvasRef} className="journey__canvas" aria-hidden="true" />
            <div ref={tipRef} className={`journey__tip${hovered ? ' is-on' : ''}`} aria-hidden="true">
              {hovered && (
                <>
                  <strong>{flag(hovered.cc)} {hovered.name}</strong>
                  <span>{KIND_SHORT[hovered.kind]}</span>
                </>
              )}
            </div>
            <p className="journey__hint">{journeyIntro.hint}</p>
          </div>

          <div className="journey__side">
            <ul className="journey__groups">
              {GROUPS.map((k) => {
                const open = tab === k;
                const items = places.filter((p) => p.kind === k);
                return (
                  <li key={k} className={`journey__group${open ? ' is-open' : ''}`} style={{ '--k': KIND_COLOR[k] } as CSSProperties}>
                    <button type="button" className="journey__grouphead" aria-expanded={open} onClick={() => toggleKind(k)}>
                      <span className="journey__swatch" aria-hidden="true" />
                      <span className="journey__grouptitle">{GROUP_TITLE[k]}</span>
                      <span className="journey__count">{items.length}</span>
                      <span className="journey__chev" aria-hidden="true" />
                    </button>
                    <div className="journey__groupbody">
                      <div>
                        <ul className="journey__list">
                          {items.map((p) => {
                            const on = selected?.id === p.id;
                            return (
                              <li key={p.id}>
                                <button type="button" className={`journey__item${on ? ' is-on' : ''}`} aria-expanded={on} tabIndex={open ? 0 : -1} onClick={() => (on ? setSelected(null) : select(p))}>
                                  <span className="journey__flag" aria-hidden="true">{flag(p.cc)}</span>
                                  {p.name}
                                  {(p.when || p.country) && <span className="journey__meta">{[p.country, p.when].filter(Boolean).join(' · ')}</span>}
                                </button>
                                {on && p.note && <p className="journey__note">{p.note}</p>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
