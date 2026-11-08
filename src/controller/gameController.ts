import type { Request, Response } from 'express';
import { isValidSquare, newGame } from '../services/gameService.js';
import type { Square, Chess } from 'chess.js';
import { Board, MakeMove } from '../models/types.js';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponseCodes, ResponseCodes } from '../constants/responseCodes.js';
import { ApiErrorResponse } from '../contracts/apiResponse.contract.js';

let inMemoryGame: ReturnType<typeof newGame> | null = null;

type ReturnData = {
  code: string;
  board?: Board | null;
};

export async function getGame(req: Request, res: Response) {
  if (!inMemoryGame) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.GAME_NOT_FOUND,
      message: 'Requested ongoing game does not exist',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(404).json(errorResponse);
  }

  res.status(200).json({
    code: ResponseCodes.SUCCESS,
    game: {
      status: 'in progress',
      board: inMemoryGame?.board() || null,
    },
  });
}

export async function getAllGames(req: Request, res: Response) {
  res.status(200).json({
    code: 'success',
    games: [inMemoryGame],
  });
}

export async function createGame(req: Request, res: Response) {
  const game = newGame();
  const board = game.board();

  inMemoryGame = game;

  const data: ReturnData = {
    code: ResponseCodes.SUCCESS,
    board,
  };

  res.status(200).json({
    data,
  });
}

export async function getMoves(req: Request, res: Response) {
  const { square } = req.query as { square: Square };

  if (!isValidSquare(square)) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.GAME_NOT_FOUND,
      message: 'game not found',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(400).json(errorResponse);
  }

  if (!inMemoryGame) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.GAME_NOT_FOUND,
      message: 'game not found',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(404).json(errorResponse);
  }

  const moves = inMemoryGame.moves({ square });

  res.status(200).json({
    square,
    moves,
  });
}

export async function makeMove(req: Request, res: Response) {
  const { makeMove } = (req.body as { makeMove: MakeMove }) || { makeMove: null };

  if (!makeMove) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.INVALID_MOVE,
      message: 'Please specify a usable move',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(404).json(errorResponse);
  }

  if (!inMemoryGame) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.GAME_NOT_FOUND,
      message: 'Requested ongoing game does not exist',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(404).json(errorResponse);
  }

  try {
    inMemoryGame.move(makeMove);
  } catch (error) {
    const errorResponse: ApiErrorResponse = {
      code: ErrorResponseCodes.INVALID_MOVE,
      message: 'Invalid move on the current board',
      timeStamp: new Date(),
      traceId: uuidv4(),
    };

    return res.status(400).json(errorResponse);
  }

  const data: ReturnData = {
    code: ResponseCodes.SUCCESS,
    board: inMemoryGame.board(),
  };

  res.status(200).json({
    data,
  });
}
