/**
 * Catches a crash anywhere in the page and shows a friendly message with a way forward,
 * instead of a blank white screen.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page error', error, info.componentStack);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="page-hero notfound">
        <div className="container">
          <p className="notfound__code" aria-hidden="true">Oops</p>
          <h1 className="page-hero__title">Something went wrong on this page.</h1>
          <p className="page-hero__intro muted">It’s on our side, not yours. Reloading usually fixes it.</p>
          <div className="notfound__actions">
            <a className="btn btn--solid" href={window.location.href} onClick={() => window.location.reload()}>Reload the page</a>
            <a href="/" className="text-link">Go to the homepage</a>
            <a href="mailto:jubran.elias@gmail.com" className="text-link">Email Jubran</a>
          </div>
        </div>
      </section>
    );
  }
}
