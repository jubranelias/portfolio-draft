import { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
