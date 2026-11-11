import type { Request, Response } from 'express';
import { InvalidMoveError, isValidSquare } from '../services/gameService.js';
import type { MakeMove } from '../models/types.js';
import {
  gameNotFoundResponse,
  invalidMoveResponse,
  newErrorResponse,
} from '../contracts/errorResponse.contract.js';
import { newSuccessResponse } from '../contracts/successResponse.contract.js';
import {
  createGame as createGameService,
  getAllGames as getAllGamesService,
  getGameBoard,
  getMoves as getMovesService,
  makeMove as makeMoveService,
} from '../services/gameService.js';

const getGameId = (req: Request): string => {
  const id = req.params.id;
  return Array.isArray(id) ? (id[0] ?? '') : (id ?? '');
};

export async function getGame(req: Request, res: Response) {
  const board = await getGameBoard(getGameId(req));

  if (!board) {
    const errorResponse = gameNotFoundResponse();

    return res.status(404).json(errorResponse);
  }

  return res.status(200).json(newSuccessResponse({ board }));
}

export async function getAllGames(req: Request, res: Response) {
  return res.status(200).json(newSuccessResponse({ games: await getAllGamesService() }));
}

export async function createGame(req: Request, res: Response) {
  const game = await createGameService();
  return res.status(200).json(newSuccessResponse(game));
}

export async function getMoves(req: Request, res: Response) {
  const { square } = req.query;

  if (typeof square !== 'string' || !isValidSquare(square)) {
    const errorResponse = newErrorResponse('INVALID_SQUARE');

    return res.status(400).json(errorResponse);
  }

  const moves = await getMovesService(getGameId(req), square);

  if (!moves) {
    const errorResponse = gameNotFoundResponse();

    return res.status(404).json(errorResponse);
  }

  return res.status(200).json(newSuccessResponse({ square, moves }));
}

export async function makeMove(req: Request, res: Response) {
  const { makeMove } = (req.body as { makeMove?: MakeMove }) || {};

  if (!makeMove) {
    const errorResponse = invalidMoveResponse();

    return res.status(400).json(errorResponse);
  }

  try {
    const board = await makeMoveService(getGameId(req), makeMove);

    if (!board) {
      const errorResponse = gameNotFoundResponse();
      return res.status(404).json(errorResponse);
    }

    return res.status(200).json(newSuccessResponse({ board }));
  } catch (error) {
    if (!(error instanceof InvalidMoveError)) {
      throw error;
    }

    const errorResponse = invalidMoveResponse();

    return res.status(400).json(errorResponse);
  }
}
