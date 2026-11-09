import type { Request, Response } from 'express';
import { isValidSquare, newGame } from '../services/gameService.js';
import type { Square } from 'chess.js';
import { MakeMove } from '../models/types.js';
import { ResponseCodes } from '../contracts/responseCodes.js';
import {
  gameNotFoundResponse,
  invalidMoveResponse,
  newErrorResponse,
} from '../contracts/errorResponse.contract.js';
import { newSuccessResponse } from '../contracts/successResponse.contract.js';
import { generateBoard } from '../utils/parseChessBoard.js';

let inMemoryGame: ReturnType<typeof newGame> | null = null;

export async function getGame(req: Request, res: Response) {
  if (!inMemoryGame) {
    const errorResponse = gameNotFoundResponse();

    return res.status(404).json(errorResponse);
  }

  const successResponse = newSuccessResponse({
    board: generateBoard(inMemoryGame?.board()),
  });

  res.status(200).json(successResponse);
}

export async function getAllGames(req: Request, res: Response) {
  const games = inMemoryGame ? [inMemoryGame?.board()] : [];

  res.status(200).json({
    code: 'SUCCESS',
    games,
  });
}

export async function createGame(req: Request, res: Response) {
  const game = newGame();
  const board = game.board();

  inMemoryGame = game;

  const data = {
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
    const errorResponse = newErrorResponse('INVALID_SQUARE');

    return res.status(400).json(errorResponse);
  }

  if (!inMemoryGame) {
    const errorResponse = gameNotFoundResponse();

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
    const errorResponse = invalidMoveResponse();

    return res.status(404).json(errorResponse);
  }

  if (!inMemoryGame) {
    const errorResponse = gameNotFoundResponse();

    return res.status(404).json(errorResponse);
  }

  try {
    inMemoryGame.move(makeMove);
  } catch (error) {
    const errorResponse = gameNotFoundResponse();

    return res.status(400).json(errorResponse);
  }

  const data = {
    code: ResponseCodes.SUCCESS,
    board: inMemoryGame.board(),
  };

  res.status(200).json({
    data,
  });
}
