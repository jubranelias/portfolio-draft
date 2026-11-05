import { CSSProperties } from 'react';

/**
 * Label that rolls up to a copy of itself on hover. It rolls word by word with a small
 * stagger, so multi-word labels still ripple, while each word stays whole: letters inside
 * a word keep the font's kerning and spacing (splitting words into single letters breaks it).
 */
export function RollText({ children }: { children: string }) {
  const words = children.split(' ');
  return (
    <span className="roll">
      <span className="roll__word" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="roll__char" style={{ '--i': i * 2 } as CSSProperties}>
            <span className="roll__track">
              <span>{w}</span>
              <span>{w}</span>
            </span>
            {i < words.length - 1 && <span className="roll__space">{' '}</span>}
          </span>
        ))}
      </span>
      <span className="visually-hidden">{children}</span>
    </span>
  );
}
