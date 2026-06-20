import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaProjectDiagram, FaEnvelope, FaMusic, FaBook, FaLinkedin } from 'react-icons/fa';
import './Navbar.css';
import blueImage from '../images/blue.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileImage = location.state?.profileImage || blueImage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="navbar-logo anil-logo-text">ANIL DEVANDLA</Link>
          <ul className="navbar-links">
            <li><Link to="/browse">Home</Link></li>
            <li><Link to="/work-experience">Experience</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/reading">Books</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/contact-me">Hire Me</Link></li>
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
          <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <div></div><div></div><div></div>
          </div>
          <img src={profileImage} alt="Profile" className="profile-icon" onClick={() => navigate('/browse')} />
        </div>
      </nav>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo anil-logo-text">ANIL DEVANDLA</div>
        <ul>
          <li><Link to="/browse" onClick={closeSidebar}><FaHome /> Home</Link></li>
          <li><Link to="/work-experience" onClick={closeSidebar}><FaBriefcase /> Experience</Link></li>
          <li><Link to="/skills" onClick={closeSidebar}><FaTools /> Skills</Link></li>
          <li><Link to="/projects" onClick={closeSidebar}><FaProjectDiagram /> Projects</Link></li>
          <li><Link to="/reading" onClick={closeSidebar}><FaBook /> Books</Link></li>
          <li><Link to="/music" onClick={closeSidebar}><FaMusic /> Music</Link></li>
          <li><Link to="/contact-me" onClick={closeSidebar}><FaEnvelope /> Hire Me</Link></li>
          <li>
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
