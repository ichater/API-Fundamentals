var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app.js';
describe('GET /games/:id/moves', () => {
    let gameId = '';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/games/new-game');
        gameId = response.body.data.id;
    }));
    it('returns legal moves for a valid square', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get(`/games/${gameId}/moves?square=e2`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ code: 'SUCCESS', message: 'SUCCESS' });
        expect(response.body.data).toEqual({ square: 'e2', moves: ['e3', 'e4'] });
    }));
    it('rejects a missing or invalid square', () => __awaiter(void 0, void 0, void 0, function* () {
        for (const path of [`/games/${gameId}/moves`, `/games/${gameId}/moves?square=z9`]) {
            const response = yield request(app).get(path);
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({ code: 'INVALID_SQUARE' });
        }
    }));
    it('returns GAME_NOT_FOUND for an unknown game id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/games/unknown-game-id/moves?square=e2');
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({ code: 'GAME_NOT_FOUND' });
    }));
});
