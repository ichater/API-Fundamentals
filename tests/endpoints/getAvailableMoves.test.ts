import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /games/:id/moves', () => {
  let gameId = '';

  beforeEach(async () => {
    const response = await request(app).post('/games/new-game');
    gameId = response.body.data.id;
  });

  it('returns legal moves for a valid square', async () => {
    const response = await request(app).get(`/games/${gameId}/moves?square=e2`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
    expect(response.body.data).toEqual({ square: 'e2', moves: ['e3', 'e4'] });
  });

  it('rejects a missing or invalid square', async () => {
    for (const path of [`/games/${gameId}/moves`, `/games/${gameId}/moves?square=z9`]) {
      const response = await request(app).get(path);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ code: 'INVALID_SQUARE' });
    }
  });

  it('returns GAME_NOT_FOUND for an unknown game id', async () => {
    const response = await request(app).get('/games/unknown-game-id/moves?square=e2');

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ code: 'GAME_NOT_FOUND' });
  });
});
