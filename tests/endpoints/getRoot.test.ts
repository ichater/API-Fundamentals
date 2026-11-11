import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /', () => {
  it('renders the home page', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('<h1>Home</h1>');
    expect(response.text).toContain('/css/shared.css');
    expect(response.text).toContain('/js/shared.js');
  });
});
