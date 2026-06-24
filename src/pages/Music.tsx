import React, { useEffect, useRef, useState } from 'react';
import './Music.css';

const spotifyTracks = [
  {
    id: "1iaXd2mn0JtUpBZ8QMGNsS",
    url: "https://open.spotify.com/track/1iaXd2mn0JtUpBZ8QMGNsS",
  },
  {
    id: "2Uyj6K6mSaFTZsPvov415i",
    url: "https://open.spotify.com/track/2Uyj6K6mSaFTZsPvov415i",
  },
  {
    id: "4pCXTYAPgdzMTCsDdDwjy3",
    url: "https://open.spotify.com/track/4pCXTYAPgdzMTCsDdDwjy3",
  },
  {
    id: "1DIXPcTDzTj8ZMHt3PDt8p",
    url: "https://open.spotify.com/track/1DIXPcTDzTj8ZMHt3PDt8p",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface TrackCardProps { track: typeof spotifyTracks[0]; index: number; }

const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  const { ref, visible } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`nf-track-card ${visible ? 'nf-track-card--visible' : ''}`}
      style={{ '--track-delay': `${index * 0.15}s` } as React.CSSProperties}
    >
      <div className="nf-track-letterbox nf-track-letterbox--top" />
      <div className="nf-track-letterbox nf-track-letterbox--bot" />
      <div className="nf-track-spotlight" />
      <div className="nf-track-accent" />
      <div className="nf-track-inner">
        <div className="nf-track-number">{String(index + 1).padStart(2, '0')}</div>
        <div className="nf-track-embed-wrap">
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Spotify Track ${track.id}`}
            className="nf-spotify-embed"
          />
        </div>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="nf-spotify-btn"
        >
          Open in Spotify
        </a>
      </div>
    </div>
  );
};

const Music: React.FC = () => {
  return (
    <div className="nf-music-container">
      <div className="nf-music-header">
        <div className="nf-music-page-bar" />
        <h2 className="nf-music-title">My Playlist</h2>
        <p className="nf-music-sub">Songs I love — click to play on Spotify</p>
      </div>
      <div className="nf-music-grid">
        {spotifyTracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Music;
