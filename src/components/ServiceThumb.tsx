/**
 * Animated illustrations for the three service cards ("Services" on the home page).
 * Each is a small hand-built SVG scene whose parts animate independently:
 * - idle: slow, subtle loops (sway, float, wave) so the scene feels alive;
 * - hover (or a tap on touch screens): a coordinated GSAP timeline that "solves" the scene,
 *   played forward on enter and smoothly reversed on leave;
 * - cursor: layers marked data-depth drift slightly toward the pointer for depth.
 * Colours come from the site's tokens (ink, surface, line, brand green) plus the paint palette.
 * Idle loops pause off screen, and visitors who prefer reduced motion get the still scene.
 *
 * - strategy: scattered sticky notes line up into a plan, a route draws to the flag on the hill
 * - ux: a phone's screen lays itself out, a toggle switches on, the cursor taps the button
 * - systems: loose components snap into place around a colour token and take on its colour
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type ServiceThumbKind = 'strategy' | 'ux' | 'systems';

const GREEN = '#2fbf71';
const BLUE = '#3fa9f5';

function Strategy() {
  const notes = [
    { x: 40, y: 44, r: -10, c: '#ffe08a' },
    { x: 96, y: 74, r: 8, c: '#ffd2c6' },
    { x: 150, y: 36, r: -4, c: '#cfe6ff' },
  ];
  return (
    <svg className="sthumb sthumb--strategy" viewBox="0 0 300 200" aria-hidden="true">
      <g data-depth="3">
        <path className="st-hill" d="M186 176C206 132 224 100 240 100S276 140 296 176Z" />
        <line className="st-ground" x1="16" y1="176" x2="284" y2="176" />
      </g>
      <g data-depth="6">
        <path className="st-route-ghost" d="M64 150c34-28 62 18 98-6s44-36 78-44" />
        <path className="st-route" d="M64 150c34-28 62 18 98-6s44-36 78-44" pathLength={1} />
        <g className="st-flag">
          <line className="st-pole" x1="240" y1="100" x2="240" y2="54" />
          <path className="st-cloth" d="M240 55l30 9-30 9z" />
        </g>
      </g>
      <g data-depth="10">
        {notes.map((n, i) => (
          <g key={i} className={`st-note st-note--${i}`} transform={`translate(${n.x} ${n.y})`}>
            <g className="st-sway">
              <g className="st-paper" transform={`rotate(${n.r} 23 21)`}>
                <rect width="46" height="42" rx="5" fill={n.c} />
                <line x1="9" y1="13" x2="37" y2="13" className="st-ink" />
                <line x1="9" y1="21" x2="31" y2="21" className="st-ink" />
                {i === 2 && <path className="st-tick" d="M13 30l6 6 12-12" pathLength={1} />}
              </g>
            </g>
          </g>
        ))}
      </g>
      <g data-depth="14">
        <g className="st-pencil-pos" transform="translate(246 128)">
          <g className="st-pencil" transform="rotate(35)">
            <rect x="-4" y="-26" width="8" height="34" rx="2" className="st-pencil-body" />
            <path d="M-4 8l4 9 4-9z" className="st-pencil-tip" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function Ux() {
  return (
    <svg className="sthumb sthumb--ux" viewBox="0 0 300 200" aria-hidden="true">
      <g data-depth="4">
        <rect className="ux-phone" x="104" y="14" width="92" height="172" rx="16" />
        <rect className="ux-bar" x="116" y="30" width="34" height="6" rx="3" />
        <g className="ux-hero">
          <rect x="116" y="44" width="68" height="40" rx="7" className="ux-hero-bg" />
          <circle className="ux-sun" cx="168" cy="56" r="6" />
          <path className="ux-hills" d="M116 84l20-18 14 12 10-8 24 14z" />
        </g>
        <rect className="ux-card ux-card--a" x="116" y="92" width="32" height="28" rx="6" />
        <rect className="ux-card ux-card--b" x="152" y="92" width="32" height="28" rx="6" />
        <g className="ux-btn">
          <rect x="116" y="150" width="68" height="20" rx="10" className="ux-btn-bg" />
          <rect x="136" y="158" width="28" height="4" rx="2" className="ux-btn-label" />
        </g>
        <circle className="ux-ripple" cx="160" cy="160" r="4" />
      </g>
      <g data-depth="10">
        <g className="ux-toggle-pos" transform="translate(214 58)">
          <g className="ux-toggle">
            <rect width="44" height="24" rx="12" className="ux-toggle-track" />
            <circle cx="12" cy="12" r="8" className="ux-toggle-knob" />
          </g>
        </g>
        <g className="ux-tooltip-pos" transform="translate(30 70)">
          <g className="ux-tooltip">
            <rect width="58" height="34" rx="8" className="ux-tip-bg" />
            <rect x="10" y="10" width="30" height="5" rx="2.5" className="ux-tip-line" />
            <rect x="10" y="19" width="38" height="5" rx="2.5" className="ux-tip-line ux-tip-line--soft" />
          </g>
        </g>
      </g>
      <g data-depth="16">
        <path className="ux-spark ux-spark--a" d="M232 118l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
        <path className="ux-spark ux-spark--b" d="M70 136l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <g className="ux-cursor-pos" transform="translate(222 150)">
          <g className="ux-cursor">
            <path d="M0 0l20 8-9 3-3 9z" className="ux-cursor-shape" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function Systems() {
  // wires run to where each component settles on hover
  const wires = ['M150 100L86 59', 'M150 100L219 59', 'M150 100L86 143', 'M150 100L220 144'];
  return (
    <svg className="sthumb sthumb--systems" viewBox="0 0 300 200" aria-hidden="true">
      <g data-depth="4">
        {wires.map((d, i) => (
          <path key={i} className="sy-wire" d={d} pathLength={1} />
        ))}
      </g>
      <g data-depth="8">
        <g className="sy-token">
          <circle cx="150" cy="100" r="34" className="sy-ring" />
          <circle cx="150" cy="100" r="25" className="sy-swatch" />
          <text x="150" y="107" textAnchor="middle" className="sy-aa">
            Aa
          </text>
        </g>
      </g>
      <g data-depth="13">
        <g className="sy-tile sy-tile--0" transform="translate(34 30)">
          <g className="sy-float">
            <rect width="76" height="30" rx="15" className="sy-fill" />
            <rect x="20" y="13" width="36" height="5" rx="2.5" className="sy-on-fill" />
          </g>
        </g>
        <g className="sy-tile sy-tile--1" transform="translate(206 22)">
          <g className="sy-float">
            <rect width="54" height="54" rx="12" className="sy-card" />
            <circle cx="27" cy="22" r="10" className="sy-fill" />
            <rect x="14" y="38" width="26" height="5" rx="2.5" className="sy-soft" />
          </g>
        </g>
        <g className="sy-tile sy-tile--2" transform="translate(30 138)">
          <g className="sy-float">
            <rect y="12" width="84" height="6" rx="3" className="sy-soft" />
            <rect y="12" width="40" height="6" rx="3" className="sy-fill sy-slider-fill" />
            <circle cx="40" cy="15" r="10" className="sy-knob" />
          </g>
        </g>
        <g className="sy-tile sy-tile--3" transform="translate(214 132)">
          <g className="sy-float">
            <rect width="40" height="40" rx="10" className="sy-card" />
            <path className="sy-check" d="M11 21l7 7 12-14" pathLength={1} />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ---------- animation ---------- */

type Built = { idle: gsap.core.Animation[]; hover: gsap.core.Timeline };

function buildStrategy(svg: SVGSVGElement): Built {
  const q = gsap.utils.selector(svg);
  const idle: gsap.core.Animation[] = [];
  q('.st-sway').forEach((el, i) => {
    idle.push(gsap.to(el, { rotation: i % 2 ? -3 : 3, svgOrigin: '23 0', duration: 2.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  });
  idle.push(gsap.to(q('.st-cloth'), { skewY: 6, scaleX: 0.92, svgOrigin: '240 64', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  idle.push(gsap.to(q('.st-pencil'), { y: -5, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }));

  gsap.set(q('.st-route, .st-tick'), { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(q('.st-flag'), { scaleY: 0.55, svgOrigin: '240 100' });
  const notes = q('.st-note');
  const hover = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
  // the scattered notes straighten and line up into a plan
  hover.to(notes[0], { x: 34, y: 40, duration: 0.6 }, 0);
  hover.to(notes[1], { x: 88, y: 40, duration: 0.6 }, 0.06);
  hover.to(notes[2], { x: 142, y: 40, duration: 0.6 }, 0.12);
  hover.to(q('.st-paper'), { rotation: 0, svgOrigin: '23 21', duration: 0.55, stagger: 0.06 }, 0);
  // the route draws itself to the flag, which rises and turns green
  hover.to(q('.st-route'), { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.25);
  hover.to(q('.st-flag'), { scaleY: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0.85);
  hover.to(q('.st-cloth'), { fill: GREEN, duration: 0.35 }, 0.9);
  // the pencil swoops in and ticks the last note
  hover.to(q('.st-pencil-pos'), { x: 172, y: 62, duration: 0.6, ease: 'power2.out' }, 0.35);
  hover.to(q('.st-tick'), { strokeDashoffset: 0, duration: 0.35, ease: 'power1.out' }, 0.85);
  return { idle, hover };
}

function buildUx(svg: SVGSVGElement): Built {
  const q = gsap.utils.selector(svg);
  const idle: gsap.core.Animation[] = [];
  idle.push(gsap.to(q('.ux-tooltip'), { y: -5, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  idle.push(gsap.to(q('.ux-toggle'), { y: 4, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  idle.push(gsap.to(q('.ux-cursor'), { x: -4, y: -6, duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  q('.ux-spark').forEach((el, i) => {
    idle.push(gsap.to(el, { scale: 0.65, rotation: 45, transformOrigin: '50% 50%', duration: 1.6, delay: i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  });

  gsap.set(q('.ux-hero'), { scale: 0.84, opacity: 0.5, svgOrigin: '150 64' });
  gsap.set(q('.ux-sun, .ux-hills'), { opacity: 0 });
  gsap.set(q('.ux-ripple'), { opacity: 0, svgOrigin: '160 160' });
  gsap.set(q('.ux-btn'), { svgOrigin: '150 160' });
  const hover = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  // the screen lays itself out
  hover.to(q('.ux-hero'), { scale: 1, opacity: 1, duration: 0.5 }, 0);
  hover.to(q('.ux-sun'), { opacity: 1, duration: 0.4 }, 0.15);
  hover.to(q('.ux-hills'), { opacity: 1, duration: 0.4 }, 0.15);
  hover.to(q('.ux-card--a'), { y: -4, duration: 0.45, ease: 'back.out(2)' }, 0.1);
  hover.to(q('.ux-card--b'), { y: 4, duration: 0.45, ease: 'back.out(2)' }, 0.16);
  // the tooltip slides in closer, the toggle switches on
  hover.to(q('.ux-tooltip-pos'), { x: 40, rotation: -4, duration: 0.5 }, 0.05);
  hover.to(q('.ux-toggle-knob'), { attr: { cx: 32 }, duration: 0.4, ease: 'back.out(1.8)' }, 0.25);
  hover.to(q('.ux-toggle-track'), { fill: GREEN, duration: 0.3 }, 0.25);
  // the cursor travels to the button and taps it
  hover.to(q('.ux-cursor-pos'), { x: 164, y: 158, duration: 0.55, ease: 'power2.inOut' }, 0.2);
  hover.to(q('.ux-btn'), { scale: 0.92, duration: 0.12, ease: 'power1.in' }, 0.75);
  hover.to(q('.ux-btn-bg'), { fill: GREEN, duration: 0.2 }, 0.75);
  hover.to(q('.ux-btn'), { scale: 1, duration: 0.35, ease: 'back.out(3)' }, 0.87);
  hover.fromTo(q('.ux-ripple'), { scale: 1, opacity: 0.6 }, { scale: 5, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, 0.78);
  return { idle, hover };
}

function buildSystems(svg: SVGSVGElement): Built {
  const q = gsap.utils.selector(svg);
  const idle: gsap.core.Animation[] = [];
  q('.sy-float').forEach((el, i) => {
    idle.push(gsap.to(el, { y: i % 2 ? 5 : -5, rotation: i % 2 ? -4 : 4, transformOrigin: '50% 50%', duration: 2.4 + i * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  });
  idle.push(gsap.to(q('.sy-ring'), { rotation: 360, svgOrigin: '150 100', duration: 18, ease: 'none', repeat: -1 }));
  idle.push(gsap.to(q('.sy-knob'), { attr: { cx: 56 }, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  idle.push(gsap.to(q('.sy-slider-fill'), { attr: { width: 56 }, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }));

  gsap.set(q('.sy-wire, .sy-check'), { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(q('.sy-token'), { svgOrigin: '150 100' });
  const tiles = q('.sy-tile');
  const hover = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
  // components snap neatly into a tidy grid around the token
  hover.to(tiles[0], { x: 48, y: 44, duration: 0.6 }, 0);
  hover.to(tiles[1], { x: 192, y: 32, duration: 0.6 }, 0.05);
  hover.to(tiles[2], { x: 44, y: 128, duration: 0.6 }, 0.1);
  hover.to(tiles[3], { x: 200, y: 124, duration: 0.6 }, 0.15);
  hover.to(q('.sy-float'), { rotation: 0, y: 0, duration: 0.5, overwrite: 'auto' }, 0);
  // the token pulses and connects to every component
  hover.to(q('.sy-wire'), { strokeDashoffset: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out' }, 0.35);
  hover.to(q('.sy-token'), { scale: 1.08, duration: 0.3, ease: 'back.out(3)' }, 0.3);
  hover.to(q('.sy-token'), { scale: 1, duration: 0.4 }, 0.62);
  // a new colour flows from the token into each component
  hover.to(q('.sy-swatch'), { fill: BLUE, duration: 0.35 }, 0.45);
  hover.to(q('.sy-fill'), { fill: BLUE, duration: 0.35, stagger: 0.06 }, 0.6);
  hover.to(q('.sy-check'), { strokeDashoffset: 0, duration: 0.35, ease: 'power1.out' }, 0.8);
  return { idle, hover };
}

const BUILDERS: Record<ServiceThumbKind, (svg: SVGSVGElement) => Built> = { strategy: buildStrategy, ux: buildUx, systems: buildSystems };

export function ServiceThumb({ kind }: { kind: ServiceThumbKind }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const svg = el?.querySelector('svg');
    if (!el || !svg) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = (el.closest('.service') as HTMLElement | null) ?? el;
    let cleanup = () => {};

    const ctx = gsap.context(() => {
      const { idle, hover } = BUILDERS[kind](svg);

      // cursor parallax: layers drift toward the pointer by their depth
      const layers = Array.from(svg.querySelectorAll<SVGGElement>('[data-depth]')).map((g) => ({
        d: Number(g.dataset.depth) || 0,
        x: gsap.quickTo(g, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(g, 'y', { duration: 0.6, ease: 'power3.out' }),
      }));
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.d);
          l.y(ny * l.d * 0.7);
        });
      };
      const reset = () => layers.forEach((l) => (l.x(0), l.y(0)));

      let touchTimer = 0;
      const enter = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        hover.timeScale(1).play();
      };
      const leave = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        hover.timeScale(1.25).reverse();
        reset();
      };
      // touch: a tap plays the scene, which settles back by itself after a moment
      const tap = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') return;
        clearTimeout(touchTimer);
        if (hover.progress() > 0.5 && !hover.reversed()) {
          hover.reverse();
          return;
        }
        hover.timeScale(1).play();
        touchTimer = window.setTimeout(() => hover.reverse(), 2600);
      };
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerdown', tap);

      // no idle loops: the scenes rest still and come alive on hover or tap (calmer page, less work for the CPU)
      idle.forEach((a) => a.pause(0));
      const io = new IntersectionObserver(() => {});
      io.observe(el);

      cleanup = () => {
        clearTimeout(touchTimer);
        io.disconnect();
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerdown', tap);
      };
    }, el);
    return () => {
      cleanup();
      ctx.revert();
    };
  }, [kind]);

  return (
    <div ref={wrap} className={`sthumb-wrap sthumb-wrap--${kind}`}>
      {kind === 'strategy' ? <Strategy /> : kind === 'ux' ? <Ux /> : <Systems />}
    </div>
  );
}
