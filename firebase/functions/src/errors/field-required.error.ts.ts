import { BaseError } from './base.error';

export class FieldRequiredError extends BaseError {
  constructor(message: string) {
    super('FieldRequiredError', message);
  }
}
