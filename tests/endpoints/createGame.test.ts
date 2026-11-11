import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('POST /games/new-game', () => {
  it('creates a game and returns its initial board', async () => {
    const response = await request(app).post('/games/new-game');
    const { data } = response.body;

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
    expect(data.id).toEqual(expect.any(String));
    expect(data.board).toHaveLength(8);
    expect(data.board.every((row: unknown[]) => row.length === 8)).toBe(true);
    expect(data.board[7][4]).toMatchObject({ id: 'e1', square: 'e1', type: 'k', color: 'w' });
    expect(data.board[4][4]).toEqual({ id: 'e4' });
  });
});
