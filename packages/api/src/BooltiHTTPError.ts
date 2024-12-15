import type { NormalizedOptions } from 'ky';
import { HTTPError } from 'ky';

import { ERROR_CODE } from './constants';

interface BooltiHttpErrorOptions {
  errorTraceId: string;
  type: keyof typeof ERROR_CODE;
  detail: string;
}

export interface BooltiHttpErrorParams {
  response: Response;
  request: Request;
  options: NormalizedOptions;
  customOptions?: BooltiHttpErrorOptions;
}

export class BooltiHttpError extends HTTPError {
  public errorTraceId?: string;
  public type?: keyof typeof ERROR_CODE;
  public detail?: string;
  public status: number;

  constructor({ request, response, options, customOptions }: BooltiHttpErrorParams) {
    super(response, request, options);

    this.name = 'BooltiHttpError';
    this.errorTraceId = customOptions?.errorTraceId;
    this.type = customOptions?.type;
    this.detail = customOptions?.detail;
    this.status = response.status;
  }
}
