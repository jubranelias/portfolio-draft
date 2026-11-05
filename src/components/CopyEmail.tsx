/**
 * The email address as plain, selectable text with a copy button beside it. Only the button does
 * anything: it copies the address and briefly confirms with a tick and "Copied".
 */
import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // older browsers / blocked clipboard: fall back to a hidden textarea
      const t = document.createElement('textarea');
      t.value = email;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <span className="copymail">
      <span className="copymail__text">{email}</span>
      <button type="button" className={`copymail__btn ${copied ? 'is-copied' : ''}`} onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'} title={copied ? 'Copied' : 'Copy'}>
        {copied ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
          </svg>
        )}
        <span className="copymail__tip" aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <span className="visually-hidden" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
    </span>
  );
}
