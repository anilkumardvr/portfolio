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
      {/* Keying on pathname forces a remount on every navigation, which
          retriggers the CSS entrance animation below — giving every
          section a consistent cinematic transition when you arrive. */}
      <div className="content page-transition-wrap" key={location.pathname}>
        <span className="page-transition-scan" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
