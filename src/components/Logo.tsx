import { Link } from 'react-router-dom';
import { site } from '../config/site';

/**
 * Brand logo: the Jubran Elias "J" icon, redrawn as an SVG (traced from
 * src/assets/images/jubranelias-icon.png) so it stays crisp at any size and takes the
 * text colour in light and dark themes. It is two pieces that meet at a pinch point:
 * the flag-like cap at the top, and the body of the J.
 *
 * Animation (all CSS, see .logo__cap / .logo__body in components.css):
 * - On page load the body rises into place, then the cap swings down onto it from the pinch point.
 * - On hover the cap tips up slightly from the pinch point, like a hat being lifted,
 *   while the body settles a touch, then both ease back.
 */
export const LOGO_PATHS = {
  cap: 'M115.6 82.3C115.1 81.7 115.1 81.2 114.9 50.3C114.7 15.4 114.6 17.5 116.4 17.0C118.5 16.4 229.1 17.0 229.8 17.7C231.3 19.2 227.1 26.7 217.6 39.5C214.0 44.3 212.9 46.1 213.0 47.4C213.2 48.8 211.8 49.7 210.6 49.0C209.9 48.5 209.5 48.5 208.3 48.5C206.7 48.7 207.1 48.5 200.5 52.7C178.7 66.6 156.8 75.1 126.0 81.3C118.0 82.9 116.3 83.0 115.6 82.3Z',
  body: 'M116.2 257.6C115.8 257.6 113.8 257.4 111.9 257.2C72.5 254.2 38.6 233.3 24.4 203.4C17.5 189.0 13.8 165.4 18.1 163.6C19.8 162.9 62.9 151.0 63.7 151.0C65.5 151.0 65.7 151.5 66.0 156.4C68.7 198.3 90.8 217.6 130.8 213.2C157.0 210.2 176.2 192.1 178.0 168.6C182.6 110.2 187.4 92.5 208.0 58.7C211.8 52.6 212.3 51.3 211.5 50.0C211.1 49.3 213.1 48.0 213.7 48.6C214.4 49.3 217.6 48.9 223.7 47.4C231.6 45.4 231.1 45.0 230.7 53.6C230.4 59.8 230.6 72.5 231.1 95.8C233.1 170.4 228.0 199.0 208.9 221.6C191.9 241.7 167.0 254.0 136.8 257.2C133.4 257.5 118.3 257.8 116.2 257.6Z',
  viewBox: '12 14 222 246',
};

export function LogoMark({ className = 'logo__mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_PATHS.viewBox} aria-hidden="true">
      <path className="logo__body" d={LOGO_PATHS.body} fill="currentColor" />
      <path className="logo__cap" d={LOGO_PATHS.cap} fill="currentColor" />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" aria-label={`${site.brand.name}, home`} onClick={onClick}>
      <LogoMark />
    </Link>
  );
}
