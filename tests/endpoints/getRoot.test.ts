import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /', () => {
  it('returns the health-check message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('endpoint is working');
  });
});
