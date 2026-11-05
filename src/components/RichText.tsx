import { Fragment } from 'react';

/** Renders a paragraph where links are written as [text](https://url). Links open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <a key={i} className="text-link" href={m[2]} target="_blank" rel="noopener noreferrer">
            {m[1]}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
