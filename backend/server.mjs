// backend/server.mjs

import express from 'express';
import cors from 'cors';
import audiusRoutes from './routes/audiusRoutes.mjs';

const app = express();
app.use(cors());
app.use('/api/audius', audiusRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
