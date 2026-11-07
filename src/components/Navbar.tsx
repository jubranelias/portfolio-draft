import { Mail } from 'lucide-react';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../config/site';
import { Logo } from './Logo';
import { SocialIcon } from './SocialIcon';
import { ThemeToggle } from './ThemeToggle';
import { StatusFace } from './StatusFace';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sliding pill behind the desktop links: follows the hovered link, rests on the current page
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number; snap: boolean } | null>(null);
  const litIndex = hoverIndex ?? activeIndex;
  const prevLit = useRef<number | null>(null);

  useLayoutEffect(() => {
    const i = linkRefs.current.findIndex((el) => el?.classList.contains('active'));
    setActiveIndex(i >= 0 ? i : null);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const snap = prevLit.current === null;
    prevLit.current = litIndex;
    const measure = () => {
      const el = litIndex !== null ? linkRefs.current[litIndex] : null;
      // Appearing from nothing: jump straight to the link and fade in, rather than sliding in from the edge
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth, snap });
    };
    measure();
    // Fonts arriving or a resize can change link widths
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [litIndex]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > 240 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [location.pathname]);

  // Mobile menu: lock scroll, Escape to close, move focus in and back out
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${hidden && !open ? 'nav--hidden' : ''} ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar container">
        <Logo onClick={() => setOpen(false)} />

        <nav className="nav__links" aria-label="Main" onMouseLeave={() => setHoverIndex(null)}>
          <span
            className={`nav__pill ${hoverIndex !== null ? 'is-hover' : ''}`}
            aria-hidden="true"
            style={{
              width: pill?.w ?? 0,
              transform: `translateX(${pill?.x ?? 0}px)`,
              opacity: pill && litIndex !== null ? 1 : 0,
              transitionProperty: pill?.snap ? 'opacity, background-color' : undefined,
            }}
          />
          {site.nav.map((item, i) => (
            <Fragment key={item.to}>
              {/* Secondary links sit after a thin divider, so the core links keep their weight */}
              {item.side && !site.nav[i - 1]?.side && <span className="nav__divider" aria-hidden="true" />}
              <NavLink
                ref={(el) => (linkRefs.current[i] = el)}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav__link ${item.side ? 'nav__link--side' : ''} ${isActive ? 'active' : ''} ${litIndex === i ? 'is-lit' : ''}`
                }
                onMouseEnter={() => setHoverIndex(i)}
                onFocus={() => setHoverIndex(i)}
                onBlur={() => setHoverIndex(null)}
              >
                {item.side && <span className="nav__spark" aria-hidden="true">✦</span>}
                {item.side ? <span className="nav__paint">{item.label}</span> : item.label}
                {item.hint && <span className="nav__hint">{item.hint}</span>}
              </NavLink>
            </Fragment>
          ))}

        </nav>

        <div className="nav__actions">
          <StatusFace />
          <ThemeToggle />
          {/* "Say hello" as an icon, matching the dark-mode toggle beside it */}
          <Link to={site.navCta.to} className="nav__hello" aria-label={site.navCta.label} title={site.navCta.label}>
            <Mail size={20} aria-hidden="true" />
          </Link>

        <button
          ref={toggleRef}
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burger" aria-hidden="true" />
        </button>
        </div>
      </div>

      {createPortal(
        <div id="mobile-menu" ref={menuRef} className={`nav__menu${open ? ' is-open' : ''}`} hidden={!open} aria-hidden={!open}>
        <nav aria-label="Mobile" className="nav__menu-links container">
          {[...site.nav, site.navCta].map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={`nav__menu-link ${'side' in item && item.side === true ? 'nav__menu-link--side' : ''}`}
              style={{ transitionDelay: `${80 + i * 50}ms` }}
            >
              {item.label}
              {'side' in item && item.side === true ? <span className="nav__menu-tag">Urban art</span> : null}
            </NavLink>
          ))}
        </nav>
        <div className="nav__menu-foot container">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <div className="socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
