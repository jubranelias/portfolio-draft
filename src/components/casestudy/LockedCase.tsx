/**
 * Al Hilal Bank: a password-protected case study (NDA work from Eurisko Mobility).
 * A minimal lock screen asks for the password; the right one reveals a short overview and a link
 * to the full case study in Figma. Only a SHA-256 hash of the password lives in the code, and the
 * unlock is remembered for the browser session.
 * Note: this is a courtesy gate on a static site, not real security. The Figma file itself stays
 * protected by Figma's own sharing permissions.
 */
import { FormEvent, useEffect, useRef, useState } from 'react';
import { CaseHero, Lead, Overview, Section } from './parts';

const PASSWORD_SHA256 = 'e37de2e7d451352d76e7051551a4cabca8ee7f23f17b720007fc0a210ea4af4b';
const FIGMA_URL = 'https://www.figma.com/design/f4OLd1rQLFqjd3iY8790TG/Al-Hilal-Bank?node-id=40000012-24247&t=nXWJuOQsJ9cGSX7f-1';
const KEY = 'unlocked:al-hilal-bank';

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function LockedCase() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1';
    } catch {
      return false;
    }
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus({ preventScroll: true });
  }, [unlocked]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value || busy) return;
    setBusy(true);
    const ok = (await sha256(value.trim())) === PASSWORD_SHA256;
    setBusy(false);
    if (ok) {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* private mode: unlock just for this view */
      }
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
      inputRef.current?.focus();
    }
  };

  if (!unlocked) {
    return (
      <div className="lock-gate">
        <div className="lock-gate__card">
          <span className="lock-gate__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="11" width="14" height="10" rx="2.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              <circle cx="12" cy="16" r="1.2" />
            </svg>
          </span>
          <p className="lock-gate__eyebrow">Al Hilal Bank · Mobile banking</p>
          <h1 className="lock-gate__title">This case study is protected</h1>
          <p className="lock-gate__text">The work is under NDA. Enter the password to view it.</p>
          <form className={`lock-gate__form${error ? ' is-error' : ''}`} onSubmit={submit} onAnimationEnd={() => setError(false)}>
            <label className="visually-hidden" htmlFor="case-password">
              Password
            </label>
            <input
              ref={inputRef}
              id="case-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-invalid={error}
              aria-describedby="case-password-msg"
            />
            <button type="submit" aria-label="Unlock" disabled={busy}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <p id="case-password-msg" className="lock-gate__msg" role="status">
            {error ? 'That password didn’t work. Try again.' : '\u00a0'}
          </p>
          <p className="lock-gate__help">
            Don’t have it? <a href="mailto:jubran.elias@gmail.com?subject=Al%20Hilal%20Bank%20case%20study%20access">Ask me for access</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hs">
      <CaseHero label="Case study · Mobile banking · iOS & Android" title="Al Hilal Bank: mobile banking" />
      <Section n="01" label="" title="Overview" id="ahb-overview">
        <Overview
          facts={[
            ['Role', 'Senior UI/UX Designer'],
            ['Agency', 'Eurisko Mobility'],
            ['Client', 'Al Hilal Bank (ADCB Group), Abu Dhabi'],
            ['Platform', 'iOS & Android'],
            ['Languages', 'English · Arabic'],
            ['Timeline', 'Feb 2022 – Dec 2024'],
          ]}
        />
      </Section>
      <Section n="02" label="" title="Context" id="ahb-work">
        <Lead>For three years I worked on Al Hilal Bank’s mobile banking app, designing across the product and building a bilingual Arabic and English design system.</Lead>
        <p className="lock-open">
          <a className="btn btn--solid" href={FIGMA_URL} target="_blank" rel="noreferrer">
            Open the case study in Figma ↗
          </a>
          <span className="lock-open__note">Opens in Figma. Access to the file is shared on request.</span>
        </p>
      </Section>
    </div>
  );
}
