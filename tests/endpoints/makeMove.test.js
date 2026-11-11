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
describe('POST /games/:id/moves', () => {
    let gameId = '';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).post('/games/new-game');
        gameId = response.body.data.id;
    }));
    it('makes a legal move and returns the updated board', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
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
    }));
    it('rejects a missing or illegal move', () => __awaiter(void 0, void 0, void 0, function* () {
        const missingMove = yield request(app).post(`/games/${gameId}/moves`).send({});
        const illegalMove = yield request(app)
            .post(`/games/${gameId}/moves`)
            .send({ makeMove: { from: 'e2', to: 'e5' } });
        expect(missingMove.status).toBe(400);
        expect(missingMove.body).toMatchObject({ code: 'INVALID_MOVE' });
        expect(illegalMove.status).toBe(400);
        expect(illegalMove.body).toMatchObject({ code: 'INVALID_MOVE' });
    }));
    it('returns GAME_NOT_FOUND when moving in an unknown game', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/games/unknown-game-id/moves')
            .send({ makeMove: { from: 'e2', to: 'e4' } });
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({ code: 'GAME_NOT_FOUND' });
    }));
});
