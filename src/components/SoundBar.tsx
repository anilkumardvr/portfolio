import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMusic } from '../MusicContext';
import './SoundBar.css';

// Floating equalizer-style toggle for the background score. Rendered once
// at the App root (alongside the <audio> element in MusicContext) so it
// follows you across every page.
const SoundBar: React.FC = () => {
  const location = useLocation();
  const { isPlaying, isMuted, toggleMute } = useMusic();

  // Nothing to control yet on the intro screen - the score hasn't started.
  if (location.pathname === '/') return null;

  const live = isPlaying && !isMuted;

  return (
    <button
      type="button"
      className={`sound-toggle ${isMuted ? 'sound-toggle--muted' : ''}`}
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      aria-pressed={!isMuted}
      title={isMuted ? 'Unmute background music' : 'Mute background music'}
    >
      <span className="sound-toggle__bars" aria-hidden="true">
        <span className={`sound-toggle__bar ${live ? 'sound-toggle__bar--live' : ''}`} />
        <span className={`sound-toggle__bar ${live ? 'sound-toggle__bar--live' : ''}`} />
        <span className={`sound-toggle__bar ${live ? 'sound-toggle__bar--live' : ''}`} />
        <span className={`sound-toggle__bar ${live ? 'sound-toggle__bar--live' : ''}`} />
      </span>
    </button>
  );
};

export default SoundBar;
