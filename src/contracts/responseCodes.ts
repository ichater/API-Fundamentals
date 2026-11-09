export type ErrorResponseCodes =
  'INVALID_MOVE' | 'GAME_NOT_FOUND' | 'INVALID_REQUEST' | 'INVALID_SQUARE' | 'INTERNAL_ERROR';

export type SuccessResponseCodes = 'SUCCESS';

type ResponseCodes = SuccessResponseCodes | ErrorResponseCodes;

export const ErrorResponseCodeMap: Record<ErrorResponseCodes, ErrorResponseCodes> = {
  INVALID_MOVE: 'INVALID_MOVE',
  GAME_NOT_FOUND: 'GAME_NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_SQUARE: 'INVALID_SQUARE',
} as const;

export const ResponseCodes: Record<ResponseCodes, ResponseCodes> = {
  ...ErrorResponseCodeMap,
  SUCCESS: 'SUCCESS',
};
