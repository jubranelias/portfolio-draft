import { CSSProperties, useEffect, useRef } from 'react';
import { site } from '../config/site';
import { LOGO_PATHS } from './Logo';

/**
 * "Hi, I'm Jubran. / One designer, start to finish."
 * A tall section with a sticky stage. In the middle floats an abstract 3D version of the
 * J icon: the logo extruded into a solid object (stacked layers in CSS 3D, no WebGL).
 *
 * As you scroll, the J turns to show its depth, the cap lifts off the body and tilts at
 * the pinch point, then settles back as the section ends, while the two halves of the
 * statement slide apart. Moving the pointer tilts it a little, like picking it up.
 * Scroll-linked, never scroll-jacked: scrolling back up plays it in reverse.
 */
const DEPTH_LAYERS = 18;


function Stack({ d, part, stackRef }: { d: string; part: 'cap' | 'body'; stackRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={stackRef} className={`j3d__stack j3d__stack--${part}`}>
      {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
        <svg
          key={i}
          className={`j3d__layer ${i === DEPTH_LAYERS - 1 ? 'j3d__layer--front' : ''}`}
          viewBox={LOGO_PATHS.viewBox}
          style={{ '--i': i, '--n': DEPTH_LAYERS } as CSSProperties}
          aria-hidden="true"
        >
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}

export function StudioIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { kicker, line } = site.home.studioIntro;

  const title = useRef<HTMLHeadingElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const obj = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  // One driver for scroll and pointer tilt. It writes plain transforms straight onto the few elements
  // that move, rather than a CSS variable on a parent: a variable change would make the browser
  // restyle all 52 extrusion layers of the J on every frame, which is what made scrolling heavy.
  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setP = (p: number) => {
      const v = p.toFixed(4);
      track.dataset.p = v;
      title.current?.style.setProperty('--p', v);
      hint.current?.style.setProperty('--p', v);
    };
    if (reduced) {
      setP(1);
      return;
    }
    let p = 0, tx = 0, ty = 0, x = 0, y = 0, raf = 0, visible = false, last = '';
    const apply = () => {
      const turn = (p - 0.5) * 110;
      const lift = Math.sin(p * Math.PI);
      const o = `rotateX(${(14 - p * 18 + y * -10).toFixed(2)}deg) rotateY(${(turn + x * 16).toFixed(2)}deg) rotateZ(${(lift * -4).toFixed(2)}deg) scale(${(0.86 + lift * 0.16).toFixed(4)})`;
      const key = o + lift.toFixed(4);
      if (key === last) return;
      last = key;
      if (obj.current) obj.current.style.transform = o;
      if (cap.current)
        cap.current.style.transform = `translateZ(-26px) translate3d(${(lift * 6).toFixed(2)}%, ${(lift * -12).toFixed(2)}%, ${(lift * 40).toFixed(1)}px) rotateZ(${(lift * -16).toFixed(2)}deg)`;
      if (shadow.current) {
        shadow.current.style.transform = `scale(${(1 - lift * 0.25).toFixed(4)})`;
        shadow.current.style.opacity = (1 - lift * 0.4).toFixed(3);
      }
    };
    const readScroll = () => {
      const r = track.getBoundingClientRect();
      p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      setP(p);
    };
    const tick = () => {
      raf = 0;
      readScroll();
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      apply();
      if (visible && (Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001)) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (visible) kick();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      track.parentElement?.classList.toggle('is-visible', visible);
      if (visible) kick();
    });
    io.observe(track);
    readScroll();
    apply();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="studio" aria-labelledby="studio-title">
      <div ref={ref} className="studio__track">
        <div className="studio__sticky">
          <p ref={hint} className="studio__scroll muted" aria-hidden="true">Keep scrolling</p>
          <h2 ref={title} id="studio-title" className="studio__title">
            <span className="studio__a">{kicker}</span>
            <span className="studio__b">{line}</span>
          </h2>
          <div ref={stage} className="j3d" aria-hidden="true">
            <div ref={shadow} className="j3d__shadow" />
            <div className="j3d__float">
              <div ref={obj} className="j3d__obj">
                <Stack d={LOGO_PATHS.body} part="body" />
                <Stack d={LOGO_PATHS.cap} part="cap" stackRef={cap} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
