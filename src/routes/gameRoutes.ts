import express from 'express';
import {
  getGame,
  createGame,
  getMoves,
  makeMove,
  getAllGames,
} from '../controller/gameController.js';

const router = express.Router();

router.get('/games/get-all', getAllGames);
router.get('/games/:id', getGame);
router.post('/games/new-game', createGame);
router.get('/games/:id/moves', getMoves);
router.post('/games/:id/moves', makeMove);

export default router;
