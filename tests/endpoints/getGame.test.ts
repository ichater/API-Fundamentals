import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /games/:id', () => {
  let gameId = '';

  beforeEach(async () => {
    const response = await request(app).post('/games/new-game');
    gameId = response.body.data.id;
  });

  it('returns the requested game board', async () => {
    const response = await request(app).get(`/games/${gameId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
    expect(response.body.data.board).toHaveLength(8);
    expect(response.body.data.board[0][0]).toMatchObject({
      id: 'a8',
      square: 'a8',
      type: 'r',
      color: 'b',
    });
  });

  it('returns GAME_NOT_FOUND for an unknown game id', async () => {
    const response = await request(app).get('/games/unknown-game-id');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ code: 'GAME_NOT_FOUND' });
  });
});
