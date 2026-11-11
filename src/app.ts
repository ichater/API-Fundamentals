import express from 'express';
import gameRoutes from './routes/gameRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('endpoint is working');
});
app.use('/', gameRoutes);

export default app;
