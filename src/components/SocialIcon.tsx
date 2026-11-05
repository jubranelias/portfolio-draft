/** Small brand marks for social links. Add a case here to support another network. */
export function SocialIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true as const, fill: 'currentColor' };
  switch (name) {
    case 'instagram':
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'x':
      return (
        <svg {...p}>
          <path d="M17.6 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.6 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l10.9 14.5Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...p}>
          <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.1 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8ZM9.8 15V9l5.7 3-5.7 3Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...p}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2 0-2.75-1.67-2.75-1.68 0-1.94 1.3-1.94 2.66V21h-4V9.75Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...p}>
          <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
        </svg>
      );
    case 'vimeo':
      return (
        <svg {...p}>
          <path d="M22 7.3c-.1 2-1.5 4.7-4.1 8.1-2.7 3.5-5 5.3-6.9 5.3-1.2 0-2.2-1.1-3-3.3L6.4 11.4c-.6-2.2-1.2-3.3-1.9-3.3-.1 0-.7.3-1.6 1L2 7.8l3-2.7c1.4-1.2 2.4-1.8 3-1.9 1.6-.2 2.6.9 3 3.3.4 2.6.7 4.2.8 4.8.5 2.1 1 3.1 1.5 3.1.4 0 1.1-.7 1.9-2.1.9-1.4 1.3-2.4 1.4-3.1.1-1.2-.3-1.8-1.4-1.8-.5 0-1 .1-1.5.3 1-3.3 3-4.9 5.8-4.8 2.1.1 3.1 1.4 3 4Z" />
        </svg>
      );
    case 'website':
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
        </svg>
      );
    default:
      return <svg {...p}><circle cx="12" cy="12" r="9" /></svg>;
  }
}
