import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';

// Total time (ms) the transition plays before we route to /browse.
// Kept in sync with netflix-sound.mp3 (~3.24s).
const TRANSITION_MS = 3300;

const NAME = 'ANIL DEVANDLA';
// Index (can be fractional) of the point every letter converges toward —
// the same spot the "N" logo will zoom in from.
const CONVERGE_CENTER = (NAME.length - 1) / 2;

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
      <div className={`title-name-wrap ${isClicked ? 'converge-name' : ''}`}>
        <span className="intro-name">
          {NAME.split('').map((ch, i) => {
            const dx = (CONVERGE_CENTER - i) * 0.92;
            return (
              <span
                key={i}
                className="name-letter"
                style={
                  {
                    '--dx': `${dx}em`,
                    animationDelay: `${Math.abs(CONVERGE_CENTER - i) * 0.02}s`,
                  } as React.CSSProperties
                }
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </span>
      </div>

      {!isClicked && (
        <div className="scroll-text">
          <span>TAP ANYWHERE TO EXPLORE</span>
        </div>
      )}

      {isClicked && (
        <div className="netflix-tudum" aria-hidden="true">
          <div className="netflix-strips">
            <span className="strip strip-1" />
            <span className="strip strip-2" />
            <span className="strip strip-3" />
            <span className="strip strip-4" />
            <span className="strip strip-5" />
            <span className="strip strip-6" />
            <span className="strip strip-7" />
          </div>
          <div className="netflix-n-wrap">
            <span className="netflix-n">N</span>
          </div>
          <div className="tudum-flash" />
          <div className="tudum-blackout" />
        </div>
      )}
    </div>
  );
};

export default NetflixTitle;
