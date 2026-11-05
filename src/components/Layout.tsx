import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Preloader } from './Preloader';
import { BackToTop } from './BackToTop';
import { OfflineBanner } from './OfflineBanner';
import { ErrorBoundary } from './ErrorBoundary';
import { watchBrokenImages } from '../lib/brokenImages';

export function Layout() {
  const { pathname } = useLocation();

  // New page: start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => watchBrokenImages(), []);

  return (
    <>
      <Preloader />
      <BackToTop />
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <Navbar />
      <OfflineBanner />
      <main id="main" tabIndex={-1} key={pathname} className="page">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
