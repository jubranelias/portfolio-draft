import { CSSProperties, useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

/** A statement whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref);
  const words = text.split(' ');
  return (
    <p ref={ref} className={`scrollwords ${className}`} style={{ '--n': words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
