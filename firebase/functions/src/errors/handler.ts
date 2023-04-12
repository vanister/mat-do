import { Response } from 'express';
import { BaseError } from './base.error';
import { Logger } from '../core';

export function handleError(
  error: Error,
  response: Response,
  logger: Logger = console
): void {
  logger.log(error);

  if (error instanceof BaseError) {
    response.status(400).send(error.message as any);
    return;
  }

  response.sendStatus(500);
}
