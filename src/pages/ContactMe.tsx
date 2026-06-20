import React from 'react';
import profilePic from '../images/anil.jpg';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin, FaGithub } from 'react-icons/fa';
import './ContactMe.css';

const ContactMe: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <img src={profilePic} alt="Anil Kumar Devandla" className="badge-avatar" />
        <h1>Contact Anil Kumar Devandla</h1>
        <p>Senior DevOps Engineer | SRE | Kubernetes | Terraform | CI/CD | Platform Engineering</p>

        <div className="contact-actions">
          <a href="mailto:anilkumardevandla21@gmail.com"><FaEnvelope /> Email Me</a>
          <a href="tel:+14376634554"><FaPhoneAlt /> 437-663-4554</a>
          <a href="https://linkedin.com/in/anilkumardevandla" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
          <a href="https://github.com/anilkumardvr" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
        </div>

        <p className="coffee-line"><FaCoffee /> Always open to discussing DevOps, Kubernetes, cloud platforms, and automation roles.</p>
      </div>
    </div>
  );
};

export default ContactMe;
