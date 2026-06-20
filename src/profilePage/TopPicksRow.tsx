import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { FaPassport, FaCode, FaBriefcase, FaCertificate, FaHandsHelping, FaProjectDiagram, FaEnvelope, FaMusic, FaBook, FaCloud } from 'react-icons/fa';

type ProfileType = 'recruiter' | 'developer' | 'stalker' | 'adventure';

interface TopPicksRowProps {
  profile: ProfileType;
}

const topPicksConfig = {
  recruiter: [
    { title: "Work Permit", imgSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80", icon: <FaPassport />, route: "/work-permit" },
    { title: "Skills", imgSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", icon: <FaCode />, route: "/skills" },
    { title: "Experience", imgSrc: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80", icon: <FaBriefcase />, route: "/work-experience" },
    { title: "Certifications", imgSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", icon: <FaCertificate />, route: "/certifications" },
    { title: "Recommendations", imgSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80", icon: <FaHandsHelping />, route: "/recommendations" },
    { title: "Projects", imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", icon: <FaProjectDiagram />, route: "/projects" },
    { title: "Contact Me", imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", icon: <FaEnvelope />, route: "/contact-me" }
  ],
  developer: [
    { title: "AKS / Kubernetes", imgSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80", route: "/skills", icon: <FaCloud /> },
    { title: "Projects", imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Certifications", imgSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", route: "/certifications", icon: <FaCertificate /> },
    { title: "Experience", imgSrc: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Automation", imgSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80", route: "/projects", icon: <FaCode /> },
    { title: "Contact Me", imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", route: "/contact-me", icon: <FaEnvelope /> }
  ],
  stalker: [
    { title: "Career Journey", imgSrc: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80", route: "/work-experience", icon: <FaBriefcase /> },
    { title: "Skills", imgSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", route: "/skills", icon: <FaCode /> },
    { title: "Projects", imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Recommendations", imgSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80", route: "/recommendations", icon: <FaHandsHelping /> },
    { title: "Contact Me", imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", route: "/contact-me", icon: <FaEnvelope /> },
  ],
  adventure: [
    { title: "Music", imgSrc: "https://picsum.photos/seed/music/250/200", route: "/music", icon: <FaMusic /> },
    { title: "Projects", imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Reading", imgSrc: "https://picsum.photos/seed/books/250/200", route: "/reading", icon: <FaBook /> },
    { title: "Contact Me", imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", route: "/contact-me", icon: <FaEnvelope /> },
    { title: "Certifications", imgSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", route: "/certifications", icon: <FaCertificate /> }
  ]
};

const TopPicksRow: React.FC<TopPicksRowProps> = ({ profile }) => {
  const navigate = useNavigate();
  const topPicks = topPicksConfig[profile];

  return (
    <div className="top-picks-row">
      <h2 className="row-title">Today's Top Picks for {profile}</h2>
      <div className="card-row">
        {topPicks.map((pick, index) => (
          <div key={index} className="pick-card" onClick={() => navigate(pick.route)} style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay"><div className="pick-label">{pick.title}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksRow;
