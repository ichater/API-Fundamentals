import type { GameRecord } from '../models/types.js';

export interface GameRepository {
  findById(id: string): Promise<GameRecord | undefined>;
  findAll(): Promise<GameRecord[]>;
  insert(game: GameRecord): Promise<void>;
  update(game: GameRecord): Promise<void>;
}

const games: GameRecord[] = [];

export const gameRepository: GameRepository = {
  async findById(id) {
    const game = games.find((record) => record.id === id);
    return game ? { ...game } : undefined;
  },

  async findAll() {
    return games.map((game) => ({ ...game }));
  },

  async insert(game) {
    games.push({ ...game });
  },

  async update(game) {
    const existingIndex = games.findIndex((existingGame) => existingGame.id === game.id);

    if (existingIndex === -1) {
      throw new Error(`Cannot update missing game: ${game.id}`);
    }

    games[existingIndex] = { ...game };
  },
};
