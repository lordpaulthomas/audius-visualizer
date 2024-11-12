// backend/routes/audiusRoutes.mjs

import express from 'express';
import { fetchTrendingTracks, fetchTrackStream } from '../services/audiusService.mjs';

const router = express.Router();

// Existing trending and underground routes
router.get('/trending', async (req, res) => {
  try {
    const tracks = await fetchTrendingTracks('trending');
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending tracks' });
  }
});

router.get('/underground', async (req, res) => {
  try {
    const tracks = await fetchTrendingTracks('underground');
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch underground trending tracks' });
  }
});

// New route to fetch the stream URL of a track
router.get('/stream/:trackId', async (req, res) => {
  const { trackId } = req.params;
  try {
    const streamUrl = await fetchTrackStream(trackId);
    res.json({ streamUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track stream' });
  }
});

export default router;
