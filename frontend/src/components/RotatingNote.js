// src/components/RotatingNote.js
import React from 'react';
import noteIcon from '../assets/music-note.png'; // Adjust path if needed

const RotatingNote = () => {
  return (
    <div style={styles.container}>
      <img src={noteIcon} alt="Loading" style={styles.note} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  note: {
    width: '80px', // Adjust size as desired
    height: '80px',
    animation: 'spin 1.5s linear infinite',
  },
};

// Add keyframes for rotation in CSS
export default RotatingNote;
