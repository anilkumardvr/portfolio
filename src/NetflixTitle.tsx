import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';

// Total time (ms) the "tudum" transition plays before we route to /browse.
// Kept in sync with netflix-sound.mp3 (~3.24s) + a hair of black hold.
const TRANSITION_MS = 3300;

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
      const timer = setTimeout(() => navigate('/browse'), TRANSITION_MS);
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
          <span>TAP ANYWHERE TO EXPLORE</span>
        </div>
      )}

      {isClicked && (
        <div className="netflix-tudum" aria-hidden="true">
          <div className="tudum-bars">
            <span className="tudum-bar bar-1" />
            <span className="tudum-bar bar-2" />
            <span className="tudum-bar bar-3" />
            <span className="tudum-bar bar-4" />
            <span className="tudum-bar bar-5" />
          </div>
          <div className="tudum-flash" />
          <div className="tudum-blackout" />
        </div>
      )}
    </div>
  );
};

export default NetflixTitle;
