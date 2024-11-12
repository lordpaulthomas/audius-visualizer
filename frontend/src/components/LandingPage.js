// src/components/LandingPage.js
import React, { useState } from 'react';
import Logo from './Logo';

function LandingPage({ onSelection }) {
  const [selection, setSelection] = useState('');

  const handleSelect = (event) => setSelection(event.target.value);
  const handleSubmit = () => selection && onSelection(selection);

  return (
    <div className="landing-page" style={{ textAlign: 'center', padding: '20px' }}>
      {/* <Logo size={250} style={{ marginBottom: '20px' }} /> */}
      <h1>Welcome to Audius Visualizer</h1>
      <select value={selection} onChange={handleSelect}>
        <option value="" disabled>Select Track Type</option>
        <option value="trending">Trending Tracks</option>
        <option value="underground">Underground Trending Tracks</option>
      </select>
      <button onClick={handleSubmit} disabled={!selection}>View Tracks</button>
    </div>
  );
}

export default LandingPage;
