import React, { useEffect, useRef, useState } from 'react';
import profilePic from '../images/anil.jpg';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin, FaGithub, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import './ContactMe.css';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const contactLinks = [
  { href: "mailto:anilkumardevandla21@gmail.com", icon: <FaEnvelope />, label: "Email Me", sub: "anilkumardevandla21@gmail.com", type: "email" },
  { href: "tel:+14376634554", icon: <FaPhoneAlt />, label: "Call Me", sub: "437-663-4554", type: "phone" },
  { href: "https://linkedin.com/in/anilkumardevandla", icon: <FaLinkedin />, label: "LinkedIn", sub: "linkedin.com/in/anilkumardevandla", type: "linkedin", external: true },
  { href: "https://github.com/anilkumardvr", icon: <FaGithub />, label: "GitHub", sub: "github.com/anilkumardvr", type: "github", external: true },
];

const ContactMe: React.FC = () => {
  const { ref: heroRef, visible: heroVisible } = useInView(0.1);
  const { ref: cardsRef, visible: cardsVisible } = useInView(0.1);

  return (
    <div className="nf-contact-container">
      <div className="nf-contact-letterbox nf-contact-letterbox--top" />
      <div className="nf-contact-letterbox nf-contact-letterbox--bot" />

      <div ref={heroRef} className={`nf-contact-hero ${heroVisible ? 'nf-contact-hero--visible' : ''}`}>
        <div className="nf-contact-spotlight" />
        <div className="nf-contact-avatar-ring">
          <div className="nf-contact-avatar-inner">
            <img src={profilePic} alt="Anil Kumar Devandla" className="nf-contact-avatar" />
          </div>
          <div className="nf-contact-ring nf-contact-ring--1" />
          <div className="nf-contact-ring nf-contact-ring--2" />
        </div>
        <div className="nf-contact-info">
          <div className="nf-contact-page-bar" />
          <h1 className="nf-contact-name">Anil Kumar Devandla</h1>
          <p className="nf-contact-role">Senior DevOps Engineer | SRE | Kubernetes | Terraform | CI/CD | Platform Engineering</p>
          <div className="nf-contact-location">
            <FaMapMarkerAlt className="nf-contact-loc-icon" />
            <span>Toronto, Ontario, Canada</span>
          </div>
        </div>
      </div>

      <div ref={cardsRef} className={`nf-contact-links ${cardsVisible ? 'nf-contact-links--visible' : ''}`}>
        {contactLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`nf-contact-link-card nf-contact-link-card--${link.type}`}
            style={{ '--link-delay': `${i * 0.1}s` } as React.CSSProperties}
          >
            <div className="nf-link-icon">{link.icon}</div>
            <div className="nf-link-text">
              <span className="nf-link-label">{link.label}</span>
              <span className="nf-link-sub">{link.sub}</span>
            </div>
            <div className="nf-link-arrow">&#8250;</div>
          </a>
        ))}
      </div>

      <div className="nf-contact-coffee">
        <FaCoffee className="nf-coffee-icon" />
        <p>Always open to discussing DevOps, Kubernetes, cloud platforms, and automation roles.</p>
      </div>
    </div>
  );
};

export default ContactMe;
