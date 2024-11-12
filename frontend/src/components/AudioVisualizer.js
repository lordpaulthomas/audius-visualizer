import React, { useRef, useEffect, useState } from 'react';
import { initAudioContext, disconnectSourceNode } from '../audioManager';
import RadialPulse from '../visualizers/RadialPulse';
import Waveform from '../visualizers/Waveform';
import CircularLines from '../visualizers/CircularLines';
import AbstractShapes from '../visualizers/AbstractShapes';

function AudioVisualizer({ streamUrl, artistName, trackTitle, artistUrl, albumArtUrl, onClose }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [visualizerMode, setVisualizerMode] = useState('Radial Pulse');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const visualizerNames = {
    'Radial Pulse': 'Harmonics',
    'Waveform': 'SineWave',
    'Circular Lines': 'Mandala',
    'Abstract Shapes': 'Fractal',
  };
  const visualizerOptions = Object.keys(visualizerNames);

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true)).catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false)).catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const handleSpacebar = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [isPlaying]);

  useEffect(() => {
    const audioElement = new Audio();
    audioElement.crossOrigin = 'anonymous';
    audioElement.src = streamUrl;
    audioElement.currentTime = audioCurrentTime;
    audioRef.current = audioElement;

    const { analyser } = initAudioContext(audioRef.current);
    analyserRef.current = analyser;
    audioElement.addEventListener('timeupdate', () => setAudioCurrentTime(audioElement.currentTime));

    if (isPlaying) {
      audioElement.play().catch((error) => console.error('Error playing audio:', error));
    }

    return () => {
      setAudioCurrentTime(audioElement.currentTime);
      audioElement.pause();
      disconnectSourceNode();
      audioElement.remove();
    };
  }, [streamUrl, isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const drawVisualizer = () => {
      if (!isPlaying) return;
      requestAnimationFrame(drawVisualizer);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackgroundGradient(ctx, canvas);

      switch (visualizerMode) {
        case 'Radial Pulse':
          RadialPulse(ctx, dataArray, bufferLength, canvas);
          break;
        case 'Waveform':
          Waveform(ctx, dataArray, bufferLength, canvas);
          break;
        case 'Circular Lines':
          CircularLines(ctx, dataArray, bufferLength, canvas);
          break;
        case 'Abstract Shapes':
          AbstractShapes(ctx, dataArray, bufferLength, canvas);
          break;
        default:
          RadialPulse(ctx, dataArray, bufferLength, canvas);
      }
    };

    drawVisualizer();
  }, [visualizerMode, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setAudioCurrentTime(audioRef.current.currentTime);
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = audioCurrentTime;
        audioRef.current.play().catch((error) => console.error('Error playing audio:', error));
      }
      return !prev;
    });
  };

  return (
    <div style={{
      position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {/* Visualizer selection buttons */}
      <div style={{
        position: 'absolute', top: '10px', display: 'flex', justifyContent: 'center',
        gap: '10px', width: '100%', zIndex: 1
      }}>
        {visualizerOptions.map((option) => (
          <button
            key={option}
            onClick={() => setVisualizerMode(option)}
            style={{
              padding: '8px 12px', fontSize: '14px', color: option === visualizerMode ? '#fff' : '#ccc',
              backgroundColor: option === visualizerMode ? '#444' : '#333', border: 'none',
              cursor: 'pointer', borderRadius: '5px',
            }}
          >
            {visualizerNames[option]}
          </button>
        ))}
      </div>

      <canvas ref={canvasRef} width="1920" height="1080" style={{
        width: '100%', height: '100%', backgroundColor: '#000',
      }}></canvas>

      {/* Artist Info */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '20px', color: '#fff',
        display: 'flex', alignItems: 'center', zIndex: 1,
      }}>
        <img src={albumArtUrl} alt="Album Art" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
        <div>
          <p style={{ margin: '0', fontSize: '18px' }}>{trackTitle}</p>
          <p style={{ margin: '0', fontSize: '14px' }}>
            by <a href={artistUrl} style={{ color: '#fff', textDecoration: 'underline' }}>{artistName}</a>
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', zIndex: 1,
      }}>
        <button onClick={togglePlayPause} style={buttonStyle}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={onClose} style={buttonStyle}>Exit</button>
        <button onClick={toggleFullScreen} style={buttonStyle}>
          {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px', fontSize: '16px', color: '#fff', backgroundColor: '#333',
  border: 'none', cursor: 'pointer', borderRadius: '5px', opacity: 0.8,
};

function drawBackgroundGradient(ctx, canvas) {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const hue = (Date.now() / 20) % 360;
  gradient.addColorStop(0, `hsl(${hue}, 60%, 15%)`);
  gradient.addColorStop(1, `hsl(${(hue + 90) % 360}, 60%, 15%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export default AudioVisualizer;
