/**
 * A tiny face in the header: its eyes follow the cursor, it blinks now and then, does a little half-turn hop every so often, and it falls
 * asleep (eyes closed) after a few seconds without movement. Hovering or focusing it shows a
 * small status label ("Currently designing", set in site.status). Hidden on phones; the eyes
 * stay still for visitors who prefer reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import { site } from '../config/site';

const SLEEP_AFTER = 5000;

export function StatusFace() {
  const face = useRef<HTMLSpanElement>(null);
  const [eyes, setEyes] = useState({ x: 0, y: 0 });
  const [asleep, setAsleep] = useState(false);
  const [blink, setBlink] = useState(false);
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let sleepT = window.setTimeout(() => setAsleep(true), SLEEP_AFTER);
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      setAsleep(false);
      clearTimeout(sleepT);
      sleepT = window.setTimeout(() => setAsleep(true), SLEEP_AFTER);
      if (reduced || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = face.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, d / 160); // pupils move further the further away the cursor is
        setEyes({ x: (dx / d) * 3 * reach, y: (dy / d) * 2.4 * reach });
      });
    };
    // an occasional blink while awake
    let blinkT = 0;
    const scheduleBlink = () => {
      blinkT = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 2800 + Math.random() * 3500);
    };
    if (!reduced) scheduleBlink();
    // and a little hop every so often, just to say hi
    let jumpT = 0;
    const scheduleJump = () => {
      jumpT = window.setTimeout(() => {
        setJump(true);
        window.setTimeout(() => setJump(false), 900);
        scheduleJump();
      }, 9000 + Math.random() * 8000);
    };
    if (!reduced) scheduleJump();
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      clearTimeout(sleepT);
      clearTimeout(blinkT);
      clearTimeout(jumpT);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className={`face ${asleep ? 'is-asleep' : ''} ${blink ? 'is-blink' : ''} ${jump ? 'is-jump' : ''}`} tabIndex={0} aria-label={`Status: ${site.status}`} role="img">
      <span ref={face} className="face__head" aria-hidden="true">
        <span className="face__eyes" style={{ transform: `translate(${eyes.x}px, ${eyes.y}px)` }}>
          <span className="face__eye" />
          <span className="face__eye" />
        </span>
      </span>
      {/* little z's drifting up while it sleeps */}
      <span className="face__zzz" aria-hidden="true">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </span>
      <span className="face__status" aria-hidden="true">
        <span className="face__dot" />
        {site.status}
      </span>
    </span>
  );
}
