import React from 'react';
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

const Music: React.FC = () => {
  return (
    <div className="music-page">
      <div className="music-header">
        <h2 className="music-title">🎵 My Playlist</h2>
        <p className="music-subtitle">Songs I love — click to play on Spotify</p>
      </div>

      <div className="spotify-tracks-grid">
        {spotifyTracks.map((track) => (
          <div key={track.id} className="spotify-track-card">
            <iframe
              src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify Track ${track.id}`}
              className="spotify-embed"
            />
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-open-btn"
            >
              Open in Spotify ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
