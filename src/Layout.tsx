import React from 'react';
import Navbar from './components/NavBar';
import VisitorCounter from './components/VisitorCounter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
    <Navbar />
    <div className="content">{children}</div>
    <VisitorCounter />
    </div>
    );
};

export default Layout;
