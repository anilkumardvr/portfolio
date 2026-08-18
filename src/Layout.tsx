import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

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
    </div>
  );
};

export default Layout;
