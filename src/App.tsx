import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
// every other page is its own chunk, fetched when first visited
const About = lazy(() => import('./pages/About'));
const Works = lazy(() => import('./pages/Works'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const Noticed = lazy(() => import('./pages/Noticed'));
const Contact = lazy(() => import('./pages/Contact'));
const Dihzahyners = lazy(() => import('./pages/Dihzahyners'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The single-file preview build uses hash URLs (/#/about) so it works from any host
// without server rewrites. Normal builds use clean URLs (/about).
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<div className="case-loading" aria-busy="true" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="works" element={<Works />} />
          <Route path="works/:slug" element={<WorkDetail />} />
          <Route path="noticed" element={<Noticed />} />
          {/* The old Journal pages now lead to the visual diary */}
          <Route path="blog/*" element={<Navigate to="/noticed" replace />} />
          <Route path="dihzahyners" element={<Dihzahyners />} />
          {/* Earlier spelling, kept so old links still land on the page */}
          <Route path="dihzahyenrs" element={<Navigate to="/dihzahyners" replace />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}
