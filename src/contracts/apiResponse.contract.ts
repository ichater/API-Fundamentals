import { ErrorResponseCodes } from '../constants/responseCodes.js';

export type ApiErrorResponse = {
  code: ErrorResponseCodes;
  message: string;
  timeStamp?: Date;
  traceId?: string;
};
