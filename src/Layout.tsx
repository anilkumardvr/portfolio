import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa';
import Navbar from './components/NavBar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);

  // Every navigation remounts the wrapper below (keyed by pathname) so the
  // curtain/scanline replay — but the browser keeps the old scroll offset,
  // which meant arriving on a short page could drop you mid-way down it.
  // Snapping back to the top keeps the reveal honest.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      {/* The curtain bars + scanline live OUTSIDE the transformed wrapper
          below, as direct siblings. A `transform` on an ancestor makes it
          the containing block for `position: fixed` descendants — nesting
          these inside the animated wrapper was silently turning them into
          full-height blocks stacked underneath the page content, doubling
          every route's scrollable height (the large empty black area at
          the bottom of each section). Keeping them here, keyed by
          pathname, retriggers the reveal on every navigation while
          staying correctly pinned to the viewport. */}
      <span className="page-transition-bar page-transition-bar--top" key={`bar-top-${location.pathname}`} aria-hidden="true" />
      <span className="page-transition-bar page-transition-bar--bottom" key={`bar-bottom-${location.pathname}`} aria-hidden="true" />
      <span className="page-transition-scan" key={`scan-${location.pathname}`} aria-hidden="true" />
      <div className="content page-transition-wrap" key={`wrap-${location.pathname}`}>
        {children}
      </div>

      <button
        type="button"
        className={`scroll-top-btn ${showTop ? 'scroll-top-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaChevronUp />
      </button>
    </div>
  );
};

export default Layout;
