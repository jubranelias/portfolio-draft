import { CSSProperties, ElementType, Fragment } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Heading whose words slide up from a mask when it enters the viewport.
 * The full text is kept in an aria-label so screen readers read it as one phrase.
 */
export function SplitText({ text, as: Tag = 'h2', className = '', delay = 0, id }: Props) {
  const [ref, inView] = useInView<HTMLElement>('0px 0px -8% 0px');
  const words = text.split(' ');
  return (
    <Tag
      ref={ref}
      id={id}
      className={`split ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <span className="visually-hidden">{text}</span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__word" aria-hidden="true">
            <span className="split__inner" style={{ '--i': i } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
