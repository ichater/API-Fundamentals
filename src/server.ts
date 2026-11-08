import express, { request, response } from 'express';
import gameRoutes from './routes/gameRoutes.js';

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('endpoint is working');
});
server.use('/', gameRoutes);

export default server;
