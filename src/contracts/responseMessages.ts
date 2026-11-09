import { type ErrorResponseCodes } from './responseCodes.js';

type GenericError = Extract<
  ErrorResponseCodes,
  'GAME_NOT_FOUND' | 'INVALID_MOVE' | 'INVALID_SQUARE'
>;

export const genericErrorMessages: Record<GenericError, string> = {
  GAME_NOT_FOUND: 'the requestsed game does not exist',
  INVALID_MOVE: 'Invalid move on the current board',
  INVALID_SQUARE: 'Pick a valid square on the chess board',
};
