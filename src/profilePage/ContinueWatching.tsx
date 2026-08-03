import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ContinueWatching.css';
import { FaMusic, FaBook, FaBlog, FaCertificate, FaEnvelope } from 'react-icons/fa';

type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

interface ContinueWatchingProps {
  profile: ProfileType;
}

const continueWatchingConfig = {
  recruiter: [
    { title: "Music", imgSrc: "https://picsum.photos/id/1025/300/200", link: "/music", icon: <FaMusic /> },
    { title: "Reading", imgSrc: "https://picsum.photos/id/1026/300/200", link: "/reading", icon: <FaBook /> },
    { title: "Blogs", imgSrc: "https://picsum.photos/id/1027/300/200", link: "/blogs", icon: <FaBlog /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/300/200", link: "/contact-me", icon: <FaEnvelope /> }
  ],
  developer: [
    { title: "Music", imgSrc: "https://picsum.photos/id/1025/300/200", link: "/music", icon: <FaMusic /> },
    { title: "Reading", imgSrc: "https://picsum.photos/id/1026/300/200", link: "/reading", icon: <FaBook /> },
    { title: "Blogs", imgSrc: "https://picsum.photos/id/1027/300/200", link: "/blogs", icon: <FaBlog /> },
    { title: "Certifications", imgSrc: "https://picsum.photos/id/1028/300/200", link: "/certifications", icon: <FaCertificate /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/300/200", link: "/contact-me", icon: <FaEnvelope /> }
  ],
  stalker: [
    { title: "Reading", imgSrc: "https://picsum.photos/id/1026/300/200", link: "/reading", icon: <FaBook /> },
    { title: "Blogs", imgSrc: "https://picsum.photos/id/1027/300/200", link: "/blogs", icon: <FaBlog /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/300/200", link: "/contact-me", icon: <FaEnvelope /> }
  ],
  adventure: [
    { title: "Music", imgSrc: "https://picsum.photos/id/1025/300/200", link: "/music", icon: <FaMusic /> },
    { title: "Reading", imgSrc: "https://picsum.photos/id/1026/300/200", link: "/reading", icon: <FaBook /> },
    { title: "Certifications", imgSrc: "https://picsum.photos/id/1028/300/200", link: "/certifications", icon: <FaCertificate /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/id/1029/300/200", link: "/contact-me", icon: <FaEnvelope /> }
  ]
};

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ profile }) => {
  const continueWatching = continueWatchingConfig[profile];
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="continue-watching-row" ref={rowRef}>
      <h2 className="row-title">Continue Watching for {profile}</h2>
      <div className="card-row">
        {continueWatching.map((pick, index) => (
          <Link
            to={pick.link}
            key={index}
            className={`pick-card ${isVisible ? 'in-view' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="shimmer"></div>
            <div className="progress-track">
              <div className="progress-fill" style={{ animationDelay: `${index * 0.15 + 0.5}s` }}></div>
            </div>
            <div className="overlay">
              <div className="pick-icon">
                <span className="icon-inner">{pick.icon}</span>
              </div>
              <div className="pick-label">{pick.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
