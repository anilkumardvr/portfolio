import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundMusic from './Kiki_deliveryservice.mp3';

// Mounted once at the App root (see App.tsx) so it never unmounts on route
// changes. Starts playing as soon as we leave the intro screen ("/") -
// i.e. the moment you actually enter the portfolio - then keeps looping
// quietly in the background across every page you browse to.
const AppMusic: React.FC = () => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (location.pathname === '/' || startedRef.current) return;
    startedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.play().catch((err) => {
      // Autoplay can still be blocked in some browsers/contexts; fail
      // silently rather than throwing.
      console.error('Background music failed to start:', err);
    });
  }, [location.pathname]);

  return <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />;
};

export default AppMusic;
