// frontend/src/components/TrackVisualizer.js

import React, { useEffect, useRef } from 'react';
import AudioVisualizer from './AudioVisualizer';

function TrackVisualizer({ track, streamUrl, onClose }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (streamUrl) {
      audioRef.current.src = streamUrl;
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [streamUrl]);

  return (
    <div className="visualizer-container">
      <audio ref={audioRef} controls />
      <div className="track-info">
        <a href={`https://audius.co/${track.user.handle}`} target="_blank" rel="noopener noreferrer">
          <img src={track.artwork['150x150']} alt="Album artwork" />
        </a>
        <h2>{track.title}</h2>
        <h3>
          <a href={`https://audius.co/${track.user.handle}`} target="_blank" rel="noopener noreferrer">
            {track.user.name}
          </a>
        </h3>
      </div>
      <AudioVisualizer streamUrl={streamUrl} />
      <button onClick={onClose}>Back to Track List</button>
    </div>
  );
}

export default TrackVisualizer;
