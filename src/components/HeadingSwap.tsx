import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Cycles through headlines, word by word, like the reference hero.
 * Screen readers get one stable <h1>; the animated copy is aria-hidden.
 */
export function HeadingSwap({ lines, interval = 3200 }: { lines: string[]; interval?: number }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced || lines.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % lines.length), interval);
    return () => clearInterval(id);
  }, [reduced, lines.length, interval]);

  return (
    <div className="swap">
      <h1 className="visually-hidden">{lines[0]}</h1>
      <div className="swap__stage" aria-hidden="true">
        {lines.map((line, li) => {
          const state = !started ? 'next' : li === active ? 'current' : li === (active - 1 + lines.length) % lines.length ? 'prev' : 'next';
          return (
            <p key={line} className={`swap__line swap__line--${state}`}>
              {line.split(' ').map((w, i, arr) => (
                <Fragment key={i}>
                  <span className="swap__word">
                    <span style={{ '--i': i } as CSSProperties}>{w}</span>
                  </span>
                  {i < arr.length - 1 && ' '}
                </Fragment>
              ))}
            </p>
          );
        })}
      </div>
    </div>
  );
}
