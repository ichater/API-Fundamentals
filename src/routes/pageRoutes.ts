import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/game', (_req, res) => {
  res.render('game', { title: 'Game' });
});

export default router;
