import { BaseError } from './base.error';

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized access') {
    super('UnauthorizedError', message);
  }
}
