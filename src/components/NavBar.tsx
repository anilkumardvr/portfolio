import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope, FaMusic, FaBook, FaLinkedin } from 'react-icons/fa';
import './Navbar.css';
import blueImage from '../images/blue.png';

const NAV_LINKS = [
  { to: '/browse', label: 'Home' },
  { to: '/work-experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/reading', label: 'Books' },
  { to: '/music', label: 'Music' },
  { to: '/contact-me', label: 'Hire Me' },
];

const SIDEBAR_LINKS = [
  { to: '/browse', label: 'Home', icon: <FaHome /> },
  { to: '/work-experience', label: 'Experience', icon: <FaBriefcase /> },
  { to: '/skills', label: 'Skills', icon: <FaTools /> },
  { to: '/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  { to: '/reading', label: 'Books', icon: <FaBook /> },
  { to: '/music', label: 'Music', icon: <FaMusic /> },
  { to: '/contact-me', label: 'Hire Me', icon: <FaEnvelope /> },
];

interface IndicatorState {
  left: number;
  width: number;
  ready: boolean;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorState>({ left: 0, width: 0, ready: false });
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);
  const profileImage = location.state?.profileImage || blueImage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure the active nav link so the sliding indicator bar can glide
  // to it on every navigation instead of just snapping between links.
  useEffect(() => {
    const measure = () => {
      const idx = NAV_LINKS.findIndex((link) => link.to === location.pathname);
      const el = idx >= 0 ? linkRefs.current[idx] : null;
      if (el) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
      } else {
        setIndicator((prev) => ({ ...prev, ready: false }));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [location.pathname]);

  const closeSidebar = () => setIsSidebarOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="navbar-logo anil-logo-text">ANIL DEVANDLA</Link>
          <ul className="navbar-links">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.to}
                ref={(el) => { linkRefs.current[i] = el; }}
                style={{ '--i': i } as React.CSSProperties}
              >
                <Link to={link.to} className={isActive(link.to) ? 'nav-active' : ''}>
                  {link.label}
                  <span className="nav-underline" />
                </Link>
              </li>
            ))}
            <span
              className="nav-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
                opacity: indicator.ready ? 1 : 0,
              }}
              aria-hidden="true"
            />
          </ul>
        </div>
        <div className="navbar-right">
          <a
            href="https://linkedin.com/in/anilkumardevandla"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-linkedin"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <div
            className={`hamburger ${isSidebarOpen ? 'open' : ''}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <div></div><div></div><div></div>
          </div>
          <img src={profileImage} alt="Profile" className="profile-icon" onClick={() => navigate('/browse')} />
        </div>
      </nav>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo anil-logo-text">ANIL DEVANDLA</div>
        <ul>
          {SIDEBAR_LINKS.map((link, i) => (
            <li key={link.to} style={{ '--i': i } as React.CSSProperties}>
              <Link
                to={link.to}
                onClick={closeSidebar}
                className={isActive(link.to) ? 'nav-active' : ''}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
          <li style={{ '--i': SIDEBAR_LINKS.length } as React.CSSProperties}>
            <a href="https://linkedin.com/in/anilkumardevandla" target="_blank" rel="noopener noreferrer" onClick={closeSidebar}>
              <FaLinkedin /> LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
