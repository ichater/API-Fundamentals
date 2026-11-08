export type ErrorResponseCodes =
  'INVALID_MOVE' | 'GAME_NOT_FOUND' | 'INVALID_REQUEST' | 'INVALID_SQUARE' | 'INTERNAL_ERROR';

type ResponseCodes = 'SUCCESS' | ErrorResponseCodes;

export const ErrorResponseCodes: Record<ErrorResponseCodes, ErrorResponseCodes> = {
  INVALID_MOVE: 'INVALID_MOVE',
  GAME_NOT_FOUND: 'GAME_NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_SQUARE: 'INVALID_SQUARE',
} as const;

export const ResponseCodes: Record<ResponseCodes, ResponseCodes> = {
  ...ErrorResponseCodes,
  SUCCESS: 'SUCCESS',
};
