import React, { useCallback, useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import portrait from './images/anil.jpeg';
import { useNavigate } from 'react-router-dom';

/**
 * "THE SERIES" opening:
 * black → studio card → ANIL → THE SERIES → portrait → role → ▶ PLAY
 * Edit the text below to change the opening.
 */
const OPENING = {
  originalLabel: 'A DEVANDLA ORIGINAL',
  firstName: 'ANIL',
  seriesTag: 'THE SERIES',
  tagline: ['Senior DevOps & Platform Engineer', 'Kubernetes', 'Azure • AWS'],
  portraitAlt: 'Portrait of Anil Kumar Devandla',
};

// When each beat starts (ms after the page loads).
const TIMELINE = [
  { at: 300, beat: 1 }, // studio card
  { at: 1900, beat: 2 }, // name
  { at: 2700, beat: 3 }, // THE SERIES
  { at: 3400, beat: 4 }, // portrait
  { at: 4300, beat: 5 }, // role
  { at: 5000, beat: 6 }, // play button
];

const EXIT_MS = 900;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NetflixTitle: React.FC = () => {
  const navigate = useNavigate();
  const [reduced] = useState(prefersReducedMotion);
  const [beat, setBeat] = useState(reduced ? 6 : 0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat: b }) => window.setTimeout(() => setBeat(b), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const handleDone = useCallback(() => {
    if (leaving) return;
    new Audio(netflixSound).play().catch(() => {});
    setLeaving(true);
  }, [leaving]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => navigate('/browse'), EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') handleDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleDone]);

  const on = (n: number) => (beat >= n ? ' is-on' : '');
  const raised = beat >= 4 ? ' is-raised' : '';

  return (
    <div
      className={`series-opening${leaving ? ' is-leaving' : ''}${reduced ? ' is-reduced' : ''}`}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* letterbox bars */}
      <div className={`series-bar series-bar--top${on(6)}`} />
      <div className={`series-bar series-bar--bottom${on(6)}`} />

      {/* projector light */}
      <div className={`series-glow${on(2)}`} aria-hidden="true" />

      {/* studio card */}
      <div className={`series-studio${beat === 1 ? ' is-on' : ''}`}>
        <p>{OPENING.originalLabel}</p>
      </div>

      {/* portrait */}
      <div className={`series-portrait${on(4)}`}>
        <img src={portrait} alt={OPENING.portraitAlt} />
      </div>
      <div className="series-vignette" aria-hidden="true" />

      {/* title */}
      <div className="series-title">
        <h1 className={`series-name${on(2)}${raised}`}>{OPENING.firstName}</h1>
        <p className={`series-tag${on(3)}${raised}`}>{OPENING.seriesTag}</p>
      </div>

      {/* role + play */}
      <div className="series-bottom">
        <p className={`series-role${on(5)}`}>{OPENING.tagline.join(' • ')}</p>
        <div className={`series-play-wrap${on(6)}`}>
          <button
            type="button"
            className="series-play"
            onClick={handleDone}
            tabIndex={beat >= 6 ? 0 : -1}
          >
            <span className="series-play-icon">▶</span> PLAY
          </button>
        </div>
      </div>

      <button type="button" className="series-skip" onClick={handleDone}>
        SKIP INTRO
      </button>
    </div>
  );
};

export default NetflixTitle;
