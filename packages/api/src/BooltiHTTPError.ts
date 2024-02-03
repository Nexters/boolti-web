import { HTTPError, NormalizedOptions } from 'ky';
import { ERROR_CODE } from './constants';

interface BooltiHTTPErrorOptions {
  errorTraceId: string;
  type: keyof typeof ERROR_CODE;
  detail: string;
}

class BooltiHTTPError extends HTTPError {
  public errorTraceId?: string;
  public type?: keyof typeof ERROR_CODE;
  public detail?: string;
  public status: number;

  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
    customOptions?: BooltiHTTPErrorOptions,
  ) {
    super(response, request, options);

    this.name = 'BooltiHTTPError';
    this.errorTraceId = customOptions?.errorTraceId;
    this.type = customOptions?.type;
    this.detail = customOptions?.detail;
    this.status = response.status;
  }
}

export default BooltiHTTPError;
