import { HTTPError } from 'ky';
import { ERROR_CODE } from '../constants';
import { CustomHttpError } from '../CustomHttpError';

export const checkIsHttpError = (error: Error): error is HTTPError => error instanceof HTTPError;

export const checkIsAuthError = (error: HTTPError) =>
  error.response.status === ERROR_CODE.UNAUTHROIZED.status ||
  error.response.status === ERROR_CODE.FORBIDDEN.status;

export function checkIsCustomHttpError(error: Error): error is CustomHttpError {
  return error.name === 'CustomHttpError';
}
