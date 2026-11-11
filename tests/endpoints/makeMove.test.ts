import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('POST /games/:id/moves', () => {
  let gameId = '';

  beforeEach(async () => {
    const response = await request(app).post('/games/new-game');
    gameId = response.body.data.id;
  });

  it('makes a legal move and returns the updated board', async () => {
    const response = await request(app)
      .post(`/games/${gameId}/moves`)
      .send({ makeMove: { from: 'e2', to: 'e4' } });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
    expect(response.body.data.board[4][4]).toMatchObject({
      id: 'e4',
      square: 'e4',
      type: 'p',
      color: 'w',
    });
  });

  it('rejects a missing or illegal move', async () => {
    const missingMove = await request(app).post(`/games/${gameId}/moves`).send({});
    const illegalMove = await request(app)
      .post(`/games/${gameId}/moves`)
      .send({ makeMove: { from: 'e2', to: 'e5' } });

    expect(missingMove.status).toBe(400);
    expect(missingMove.body).toMatchObject({ code: 'INVALID_MOVE' });
    expect(illegalMove.status).toBe(400);
    expect(illegalMove.body).toMatchObject({ code: 'INVALID_MOVE' });
  });

  it('returns GAME_NOT_FOUND when moving in an unknown game', async () => {
    const response = await request(app)
      .post('/games/unknown-game-id/moves')
      .send({ makeMove: { from: 'e2', to: 'e4' } });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ code: 'GAME_NOT_FOUND' });
  });
});
