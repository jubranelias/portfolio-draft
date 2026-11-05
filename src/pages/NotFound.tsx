import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Button } from '../components/Button';

export default function NotFound() {
  useDocumentMeta('Page not found');
  return (
    <section className="page-hero notfound">
      <div className="container">
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 className="page-hero__title">Nothing here, but the work is one click away.</h1>
        <p className="page-hero__intro muted">The link may be old, or the page may have moved.</p>
        <div className="notfound__actions">
          <Button to="/works">See the work</Button>
          <Link to="/" className="text-link">Go to the homepage</Link>
          <Link to="/contact" className="text-link">Say hello</Link>
        </div>
      </div>
    </section>
  );
}
