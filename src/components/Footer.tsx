import { site } from '../config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__bar">
        <p className="footer__copy">© {year} {site.brand.name}</p>
        <p className="footer__made">
          Made with love &amp; Freddo Espresso skéto.
          <span className="freddo" aria-hidden="true">
            <svg viewBox="0 0 24 28" width="22" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <clipPath id="freddo-cup">
                  <path d="M5.6 9.5h12.8l-1.4 14.5a1.2 1.2 0 0 1-1.2 1.1H8.2a1.2 1.2 0 0 1-1.2-1.1z" />
                </clipPath>
              </defs>
              {/* the coffee: a block that drains as it's drunk, then refills */}
              <g clipPath="url(#freddo-cup)">
                <rect className="freddo__coffee" x="4" y="10" width="16" height="16" fill="currentColor" stroke="none" />
                <rect className="freddo__ice freddo__ice--1" x="8" y="12.5" width="3" height="3" rx="0.6" fill="var(--c-bg)" stroke="none" />
                <rect className="freddo__ice freddo__ice--2" x="12.6" y="14.2" width="2.6" height="2.6" rx="0.6" fill="var(--c-bg)" stroke="none" />
              </g>
              <path className="freddo__straw" d="M13.5 2.5l2-1.5" />
              <path className="freddo__straw" d="M13.5 2.5L11.4 11" />
              <path d="M4 8h16" />
              <path d="M5 8l1.6 16.2a1.5 1.5 0 0 0 1.5 1.3h7.8a1.5 1.5 0 0 0 1.5-1.3L19 8" />
            </svg>
          </span>
        </p>
        <ul className="footer__links" aria-label="Follow">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a className="footer__link" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
