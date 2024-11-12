// backend/services/audiusService.js

import fetch from 'node-fetch';

export const fetchTrendingTracks = async (listType) => {
  const baseURL = listType === 'underground'
    ? 'https://audius-discovery-1.theblueprint.xyz/v1/tracks/trending/underground'
    : 'https://audius-discovery-1.theblueprint.xyz/v1/tracks/trending';
  const limit = 100;

  const response = await fetch(`${baseURL}?limit=${limit}&app_name=AudioVisualizerApp`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch trending tracks: ${errorText}`);
  }

  const data = await response.json();
  return data.data;
};

export const fetchTrackStream = async (trackId) => {
  const url = `https://audius-discovery-1.theblueprint.xyz/v1/tracks/${trackId}/stream?app_name=AudioVisualizerApp`;

  const response = await fetch(url, {
    headers: { Range: 'bytes=0-' }, // Needed to enable streaming
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch track stream: ${errorText}`);
  }

  return response.url;
};
