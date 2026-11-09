import { SuccessResponseCodes } from './responseCodes.js';

export type ApiResponse<T> = {
  code: SuccessResponseCodes;
  message: string;
  data: T;
};

export const newSuccessResponse = <T>(data: T): ApiResponse<T> => {
  return {
    code: 'SUCCESS',
    message: 'SUCCESS',
    data,
  };
};
