// src/components/Logo.js
import React from 'react';
import audiusLogo from '../assets/audius-horizontal-white.png';

function LogoWhite({ size = 200, style = {} }) {
  return (
    <img
      src={audiusLogo}
      alt="Audius Logo"
      style={{
        width: size,
        height: 'auto',
        ...style,
      }}
    />
  );
}

export default LogoWhite;
