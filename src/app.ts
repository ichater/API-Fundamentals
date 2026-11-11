import express from 'express';
import { resolve } from 'node:path';
import gameRoutes from './routes/gameRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve(process.cwd(), 'src/views'));

app.use(express.json());
app.use(express.static(resolve(process.cwd(), 'public')));
app.use('/', pageRoutes);
app.use('/', gameRoutes);

export default app;
