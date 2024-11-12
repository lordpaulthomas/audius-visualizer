import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AudioVisualizer from './components/AudioVisualizer';
import RotatingNote from './components/RotatingNote';
import Logo from './components/Logo'; // Import Logo component
import './App.css';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTracks = (listType) => {
    setLoading(true);
    setSelectedTrack(null);
    setStreamUrl(null);

    fetch(`/api/audius/${listType}`)
      .then(response => response.json())
      .then(data => {
        setTracks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tracks:', error);
        setLoading(false);
      });
  };

  const handleSelection = (listType) => {
    setSelectedList(listType);
    fetchTracks(listType);
  };

  const handlePlayTrack = async (track) => {
    setLoading(true);
    setSelectedTrack(null);

    try {
      const response = await fetch(`/api/audius/stream/${track.id}`);
      const data = await response.json();
      setSelectedTrack(track);
      setStreamUrl(data.streamUrl);
    } catch (error) {
      console.error('Error fetching stream URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeVisualizer = () => {
    setSelectedTrack(null);
  };

  return (
    <div className="App">
      {/* Audius Logo in the top left */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
        <Logo size={200} />
      </div>

      {!selectedList ? (
        <LandingPage onSelection={handleSelection} />
      ) : loading ? (
        <RotatingNote />
      ) : selectedTrack ? (
        <AudioVisualizer
          streamUrl={streamUrl}
          artistName={selectedTrack.user.name}
          trackTitle={selectedTrack.title}
          artistUrl={`https://audius.co/${selectedTrack.user.handle}`}
          albumArtUrl={selectedTrack.artwork['150x150']}
          onClose={closeVisualizer}
        />
      ) : (
        <div>
          {/* Back to Selection Button */}
          <button 
            onClick={() => setSelectedList('')} 
            style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#333',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            Back to Selection
          </button>

          {/* Centered Title */}
          <h1 style={{ textAlign: 'center', margin: '20px 0' }}>
            {selectedList === 'trending' ? 'Trending Tracks' : 'Underground Trending Tracks'}
          </h1>

          {/* Track List */}
          <ul className="track-list">
            {tracks.map((track, index) => (
              <li key={index} className="track-item">
                <div className="track-info">
                  <span className="track-rank">{index + 1}</span>
                  <span className="track-title">{track.title}</span>
                  <span className="track-artist">by {track.user.name}</span>
                </div>
                <button className="play-button" onClick={() => handlePlayTrack(track)}>Play</button>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setSelectedList('')} 
            style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#333',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            Back to Selection
          </button>
        </div>
        
      )}
    </div>
  );
}

export default App;
