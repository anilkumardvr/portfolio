import React, { useEffect, useRef, useState } from 'react';
import profilePic from '../images/anil.jpg';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin, FaGithub } from 'react-icons/fa';
import './ContactMe.css';

function useInView(threshold = 0.15) {
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

const ContactMe: React.FC = () => {
  const { ref: cardRef, visible: cardVisible } = useInView(0.1);

  return (
    <div className="contact-container">
      <div ref={cardRef} className={`contact-card ${cardVisible ? 'contact-card--visible' : ''}`}>

        {/* Avatar */}
        <div className="contact-avatar-wrap">
          <img src={profilePic} alt="Anil Kumar Devandla" className="badge-avatar" />
          <div className="contact-avatar-ring contact-avatar-ring--1" />
          <div className="contact-avatar-ring contact-avatar-ring--2" />
        </div>

        {/* Name + role */}
        <div className="contact-bar" />
        <h1>Anil Kumar Devandla</h1>
        <p className="contact-role">Senior DevOps Engineer | SRE | Kubernetes | Terraform | CI/CD | Platform Engineering</p>

        {/* Action links */}
        <div className="contact-actions">
          <a href="mailto:anilkumardevandla21@gmail.com" className="contact-link contact-link--email" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="contact-link-icon"><FaEnvelope /></span>
            <span className="contact-link-text">Email Me</span>
          </a>
          <a href="tel:+14376634554" className="contact-link contact-link--phone" style={{ '--i': 1 } as React.CSSProperties}>
            <span className="contact-link-icon"><FaPhoneAlt /></span>
            <span className="contact-link-text">437-663-4554</span>
          </a>
          <a href="https://linkedin.com/in/anilkumardevandla" target="_blank" rel="noreferrer"
            className="contact-link contact-link--linkedin" style={{ '--i': 2 } as React.CSSProperties}>
            <span className="contact-link-icon"><FaLinkedin /></span>
            <span className="contact-link-text">LinkedIn</span>
          </a>
          <a href="https://github.com/anilkumardvr" target="_blank" rel="noreferrer"
            className="contact-link contact-link--github" style={{ '--i': 3 } as React.CSSProperties}>
            <span className="contact-link-icon"><FaGithub /></span>
            <span className="contact-link-text">GitHub</span>
          </a>
        </div>

        <p className="coffee-line">
          <FaCoffee className="coffee-icon" />
          Always open to discussing DevOps, Kubernetes, cloud platforms, and automation roles.
        </p>
      </div>
    </div>
  );
};

export default ContactMe;
