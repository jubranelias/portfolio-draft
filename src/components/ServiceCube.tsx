import { CSSProperties, useEffect, useRef } from 'react';
import figma from '../assets/images/tools/figma.webp';
import claude from '../assets/images/tools/claude.webp';
import gemini from '../assets/images/tools/gemini.webp';
import slack from '../assets/images/tools/slack.webp';
import jira from '../assets/images/tools/jira.webp';

/**
 * Floating app icons beside the hero headline: the tools I work with, scattered loosely like icons
 * on a desk. Each one bobs and tilts on its own slow loop, the cluster leans gently toward the
 * pointer (each icon by a different depth, for parallax), and hovering an icon lifts it and shows
 * what I use it for. They rest on the ground until the pointer moves, then lift off and float
 * (the hero adds .h3d--awake). Kept as `WorkCube` so the hero markup didn't need to change.
 */
/** x/y: where each icon floats; gx: where it rests in the row on the ground (all % of the cluster) */
const TOOLS: { name: string; role: string; img?: string; x: number; y: number; gx: number; size: number; depth: number; tilt: number; delay: number }[] = [
  { name: 'Figma', role: 'Design & prototyping', img: figma, x: 8, y: 6, gx: 0, size: 0.34, depth: 18, tilt: -8, delay: 0 },
  { name: 'Claude', role: 'Thinking partner', img: claude, x: 58, y: 0, gx: 80, size: 0.3, depth: 10, tilt: 7, delay: 0.9 },
  { name: 'Gemini', role: 'Research & ideas', img: gemini, x: 33, y: 36, gx: 26, size: 0.36, depth: 26, tilt: 3, delay: 1.7 },
  { name: 'Jira', role: 'Planning & delivery', img: jira, x: 2, y: 66, gx: -22, size: 0.28, depth: 12, tilt: 6, delay: 0.5 },
  { name: 'Slack', role: 'Team chat', img: slack, x: 64, y: 58, gx: 56, size: 0.32, depth: 20, tilt: -6, delay: 1.3 },
  // an empty slot with a plus: there's always a next tool to learn
  { name: 'What’s next', role: 'Always learning new tools', x: 37, y: 80, gx: -46, size: 0.2, depth: 30, tilt: -4, delay: 2.2 },
];

export function WorkCube() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // the floating loop only runs while the hero is on screen
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting));
    io.observe(el);
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return () => io.disconnect();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', cx.toFixed(3));
      el.style.setProperty('--my', cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      // -1..1 across the viewport: the cluster leans toward the pointer
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <div ref={ref} className="appicons" aria-hidden="true">
      {TOOLS.map((t, i) => (
        <div
          key={t.name}
          className="appicon"
          style={{ '--x': `${t.x}%`, '--y': `${t.y}%`, '--sz': t.size, '--gy': 100 - t.size * 100 - t.y, '--gdx': t.gx - t.x, '--d': t.depth, '--tilt': `${t.tilt}deg`, '--delay': `${t.delay}s`, '--i': i } as CSSProperties}
        >
          <span className="appicon__lift">
          <span className="appicon__float">
            <span className={`appicon__tile${t.img ? '' : ' appicon__tile--next'}`}>
              {t.img ? (
                <img src={t.img} alt="" loading="eager" decoding="async" />
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </span>
            <span className="appicon__tip" aria-hidden="true">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </span>
          </span>
          </span>
        </div>
      ))}
    </div>
  );
}
