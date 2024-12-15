import { HTTPError } from 'ky';
import { ERROR_CODE } from '../constants';
import { BooltiHttpError } from '../BooltiHttpError';

export const checkIsHttpError = (error: Error): error is HTTPError => error instanceof HTTPError;

export const checkIsAuthError = (error: HTTPError) =>
  error.response.status === ERROR_CODE.UNAUTHROIZED.status ||
  error.response.status === ERROR_CODE.FORBIDDEN.status;

export function checkIsBooltiHttpError(error: Error): error is BooltiHttpError {
  return error.name === 'BooltiHttpError';
}
