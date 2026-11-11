import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /games/get-all', () => {
  it('returns the games created during the request flow', async () => {
    const created = await request(app).post('/games/new-game');
    const response = await request(app).get('/games/get-all');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
    expect(response.body.data.games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: created.body.data.id, status: 'ongoing' }),
      ]),
    );
  });
});
