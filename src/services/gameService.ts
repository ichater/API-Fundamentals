import { randomUUID } from 'node:crypto';
import { Chess, type Square } from 'chess.js';
import type { BoardWithIds, GameRecord, MakeMove } from '../models/types.js';
import { generateBoard } from '../utils/parseChessBoard.js';
import { gameRepository } from './db.js';

export class InvalidMoveError extends Error {
  constructor() {
    super('Invalid move');
    this.name = 'InvalidMoveError';
  }
}

const loadChessGame = (record: GameRecord): Chess => {
  const chess = new Chess();
  chess.loadPgn(record.game);
  return chess;
};

export const createGame = async (): Promise<{ id: string; board: BoardWithIds }> => {
  const chess = new Chess();
  chess.setHeader('White', '456');
  chess.setHeader('Black', '123');

  const game: GameRecord = {
    id: randomUUID(),
    black_id: '123',
    white_id: '456',
    status: 'ongoing',
    game: chess.pgn(),
  };

  await gameRepository.insert(game);

  return { id: game.id, board: generateBoard(chess.board()) };
};

export const getAllGames = (): Promise<GameRecord[]> => gameRepository.findAll();

export const getGame = async (id: string): Promise<Chess | null> => {
  const game = await gameRepository.findById(id);

  if (!game || game.status !== 'ongoing') {
    return null;
  }

  return loadChessGame(game);
};

export const getGameBoard = async (id: string): Promise<BoardWithIds | null> => {
  const chess = await getGame(id);
  return chess ? generateBoard(chess.board()) : null;
};

export const getMoves = async (id: string, square: Square): Promise<string[] | null> => {
  const chess = await getGame(id);
  return chess ? chess.moves({ square }) : null;
};

export const makeMove = async (id: string, move: MakeMove): Promise<BoardWithIds | null> => {
  const game = await gameRepository.findById(id);

  if (!game || game.status !== 'ongoing') {
    return null;
  }

  const chess = loadChessGame(game);

  try {
    chess.move(move);
  } catch {
    throw new InvalidMoveError();
  }

  await gameRepository.update({
    ...game,
    status: chess.isGameOver() ? 'finished' : game.status,
    game: chess.pgn(),
  });
  return generateBoard(chess.board());
};

const squareArray: Square[] = [
  'a8',
  'b8',
  'c8',
  'd8',
  'e8',
  'f8',
  'g8',
  'h8',
  'a7',
  'b7',
  'c7',
  'd7',
  'e7',
  'f7',
  'g7',
  'h7',
  'a6',
  'b6',
  'c6',
  'd6',
  'e6',
  'f6',
  'g6',
  'h6',
  'a5',
  'b5',
  'c5',
  'd5',
  'e5',
  'f5',
  'g5',
  'h5',
  'a4',
  'b4',
  'c4',
  'd4',
  'e4',
  'f4',
  'g4',
  'h4',
  'a3',
  'b3',
  'c3',
  'd3',
  'e3',
  'f3',
  'g3',
  'h3',
  'a2',
  'b2',
  'c2',
  'd2',
  'e2',
  'f2',
  'g2',
  'h2',
  'a1',
  'b1',
  'c1',
  'd1',
  'e1',
  'f1',
  'g1',
  'h1',
];

export const isValidSquare = (square: string): square is Square => {
  return squareArray.includes(square as Square);
};
