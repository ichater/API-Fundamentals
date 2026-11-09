import { ErrorResponseCodes } from './responseCodes.js';
import { v4 as uuidv4 } from 'uuid';
import { genericErrorMessages } from './responseMessages.js';

export type ApiErrorResponse = {
  code: ErrorResponseCodes;
  message: string;
  timeStamp?: Date;
  traceId?: string;
};

export const newErrorResponse = (code: ErrorResponseCodes, message?: string): ApiErrorResponse => {
  if (
    (code === 'GAME_NOT_FOUND' || code === 'INVALID_MOVE' || code === 'INVALID_SQUARE') &&
    !message
  ) {
    message = genericErrorMessages[code];
  }

  if (!message) {
    message = 'unallocated error';
  }

  return {
    code,
    message,
    timeStamp: new Date(),
    traceId: uuidv4(),
  };
};

export const gameNotFoundResponse = () => newErrorResponse('GAME_NOT_FOUND');
export const invalidMoveResponse = () => newErrorResponse('INVALID_MOVE');
