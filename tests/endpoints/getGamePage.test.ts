import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /game', () => {
  it('renders the game page with shared and game assets', async () => {
    const response = await request(app).get('/game');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('<h1>Game</h1>');
    expect(response.text).toContain('/css/shared.css');
    expect(response.text).toContain('/css/game.css');
    expect(response.text).toContain('/js/shared.js');
    expect(response.text).toContain('/js/game.js');

    const sharedScript = await request(app).get('/js/shared.js');
    const gameScript = await request(app).get('/js/game.js');

    expect(sharedScript.status).toBe(200);
    expect(gameScript.status).toBe(200);
  });
});
