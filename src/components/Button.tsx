import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { scrollToId } from '../lib/scroll';

type Variant = 'solid' | 'outline' | 'light';

interface Common {
  children: string;
  variant?: Variant;
  icon?: boolean;
  className?: string;
}

type Props =
  | (Common & { to: string; href?: never; scrollTo?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { href: string; to?: never; scrollTo?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { scrollTo: string; to?: never; href?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean; to?: never; href?: never; scrollTo?: never });

/** One button component for internal links, external links, in-page anchors and form buttons. */
export function Button(props: Props) {
  const { children, variant = 'solid', icon = true, className = '' } = props;
  const cls = `btn btn--${variant} ${className}`;
  const inner: ReactNode = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight className="btn__arrow" size={18} strokeWidth={2} />
        </span>
      )}
    </>
  );

  if ('to' in props && props.to) return <Link to={props.to} className={cls}>{inner}</Link>;
  if ('href' in props && props.href)
    return (
      <a href={props.href} className={cls} {...(props.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}>
        {inner}
      </a>
    );
  if ('scrollTo' in props && props.scrollTo) {
    const id = props.scrollTo;
    return (
      <a
        href={`#${id}`}
        className={cls}
        onClick={(e) => {
          e.preventDefault();
          scrollToId(id);
        }}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={props.type ?? 'button'} className={cls} onClick={props.onClick} disabled={props.disabled}>
      {inner}
    </button>
  );
}
