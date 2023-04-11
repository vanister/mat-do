import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  constructor(message = 'Not found') {
    super('NotFoundError', message);
  }
}
