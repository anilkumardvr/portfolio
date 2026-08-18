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

// Number of vertical bars in the tunnel curtain. The real ident reads as a
// dense wall of pillars, not a handful of wide gapped strips — more, thinner
// bars sitting close together sells the "flying through a curtain of light"
// feeling instead of looking like a handful of ribbons.
const STRIP_COUNT = 15;
const STRIP_CENTER = (STRIP_COUNT - 1) / 2;

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
        // t=0s here == the moment isClicked flips true, same clock the
        // keyframe delays below are measured against.
        <div className="netflix-tudum" aria-hidden="true">
          <div className="netflix-strips">
            {Array.from({ length: STRIP_COUNT }).map((_, i) => {
              // Bars alternate which edge of the screen they fly in from and
              // stagger their arrival slightly outward-in, like the real
              // curtain closing from both sides toward the center pillar.
              const fromEdge = i % 2 === 0 ? -1 : 1;
              const distanceFromCenter = Math.abs(i - STRIP_CENTER);
              // The real ident's strips read as a spray of color threads —
              // red, orange, magenta, violet, blue — not flat monochrome red,
              // so each bar gets its own hue that only resolves to brand red
              // once the curtain closes (see the 58% keyframe in the CSS).
              const hue = 350 - (i / (STRIP_COUNT - 1)) * 190;
              const style = {
                '--fromX': `${fromEdge * (120 + distanceFromCenter * 6)}vw`,
                '--tx': `${(i - STRIP_CENTER) * 30}px`,
                '--tz': `${-420 + distanceFromCenter * 24}px`,
                '--hue': hue,
                animationDelay: `${distanceFromCenter * 0.028}s`,
              } as React.CSSProperties;
              return <span key={i} className="strip" style={style} />;
            })}
          </div>
          {/* Darkens the middle of the tunnel so the colored threads read as
              concentrated toward the edges, like light spilling in around a
              dark center — the "N" then punches through that dark core. */}
          <div className="netflix-tunnel-vignette" />
          <div className="netflix-n-wrap">
            {/* Two shockwave rings mark the "tu" and "dum" drum hits,
                timed with the beats baked into .netflix-n's keyframes. */}
            <span className="tudum-ring tudum-ring--tu" />
            <span className="tudum-ring tudum-ring--dum" />
            <span className="netflix-n">
              <span className="netflix-n-glyph">N</span>
              {/* A soft diagonal sheen sweeps across the ribbon-folded
                  logotype once, right as it punches through on "DUM". */}
              <span className="netflix-n-sheen" aria-hidden="true" />
            </span>
          </div>
          <div className="tudum-flash" />
          <div className="tudum-chroma" />
          <div className="tudum-blackout" />
        </div>
      )}
    </div>
  );
};

export default NetflixTitle;



