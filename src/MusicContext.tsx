import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import backgroundMusic from './Kiki_deliveryservice.mp3';

const MUTE_STORAGE_KEY = 'portfolio-music-muted';

// Routes where the background score stays silent. "/browse" is the
// Netflix-style "Who's Watching?" profile picker - the score drops out
// there the same way it does the moment you land on that screen switching
// profiles, and picks back up once a profile (or any other page) is chosen.
const SILENT_ROUTES = ['/browse'];

interface MusicContextValue {
  /** True while the <audio> element is actually playing right now. */
  isPlaying: boolean;
  /** The user's own on/off preference, persisted across visits. */
  isMuted: boolean;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

function readStoredMute(): boolean {
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

// Mounted once at the App root so the <audio> element never unmounts on
// route changes. Starts playing as soon as we leave the intro screen ("/")
// - i.e. the moment you actually enter the portfolio - then keeps looping
// quietly in the background across every page you browse to, except while
// on the profile-picker screen, and except while the user has muted it.
export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [isMuted, setIsMuted] = useState<boolean>(readStoredMute);
  const [isPlaying, setIsPlaying] = useState(false);

  const isSilentRoute = SILENT_ROUTES.includes(location.pathname);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || location.pathname === '/') return;

    if (!startedRef.current) {
      startedRef.current = true;
      audio.volume = 0.35;
    }

    if (isSilentRoute || isMuted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          // Autoplay can still be blocked in some browsers/contexts; fail
          // silently rather than throwing.
          console.error('Background music failed to start:', err);
        });
    }
  }, [location.pathname, isMuted, isSilentRoute]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage failures (e.g. private browsing) - the preference
        // just won't survive a refresh.
      }
      return next;
    });
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, toggleMute }}>
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
};

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return ctx;
}
