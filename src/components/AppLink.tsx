/** "Live on the App Store ↗": used as the Status value in a case study's Overview facts. */
export function AppLink({ href, label = 'Live on the App Store' }: { href: string; label?: string }) {
  return (
    <a className="text-link applink" href={href} target="_blank" rel="noreferrer">
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
