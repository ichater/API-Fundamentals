var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';
describe('GET /games/get-all', () => {
    it('returns the games created during the request flow', () => __awaiter(void 0, void 0, void 0, function* () {
        const created = yield request(app).post('/games/new-game');
        const response = yield request(app).get('/games/get-all');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
        expect(response.body.data.games).toEqual(expect.arrayContaining([expect.objectContaining({ id: created.body.data.id, status: 'ongoing' })]));
    }));
});
