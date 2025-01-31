import type { NormalizedOptions } from 'ky';
import { HTTPError } from 'ky';

import { ERROR_CODE } from './constants';

interface CustomHttpErrorOptions {
  errorTraceId: string;
  type: keyof typeof ERROR_CODE;
  detail: string;
}

export interface CustomHttpErrorParams {
  response: Response;
  request: Request;
  options: NormalizedOptions;
  customOptions?: CustomHttpErrorOptions;
}

export class CustomHttpError extends HTTPError {
  public errorTraceId?: string;
  public type?: keyof typeof ERROR_CODE;
  public detail?: string;
  public status: number;

  constructor({ request, response, options, customOptions }: CustomHttpErrorParams) {
    super(response, request, options);

    this.name = 'CustomHttpError';
    this.errorTraceId = customOptions?.errorTraceId;
    this.type = customOptions?.type;
    this.detail = customOptions?.detail;
    this.status = response.status;
  }
}
