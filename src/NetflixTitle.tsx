import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';

const NetflixTitle: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (isClicked) return;
    new Audio(netflixSound).play().catch(console.error);
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => navigate('/browse'), 4000);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);

  return (
    <div className="netflix-intro-page" onClick={handleStart}>
      <div className={`title-name-wrap ${isClicked ? 'animate-title' : ''}`}>
        <span className="intro-name">ANIL DEVANDLA</span>
      </div>

      {!isClicked && (
        <div className="scroll-text">
          <span>SCROLL TO EXPLORE</span>
          <div className="down-arrow">⌄</div>
        </div>
      )}
    </div>
  );
};

export default NetflixTitle;
