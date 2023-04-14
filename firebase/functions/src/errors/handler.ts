import { Response } from 'express';
import { BaseError } from './base.error';
import { logger as functionLogger } from 'firebase-functions/v2';
import { Logger } from '../core';

export function handleError(
  error: Error,
  response: Response,
  logger: Logger = functionLogger
): void {
  logger.log(error);

  if (error instanceof BaseError) {
    response.status(400).send(error.message as any);
    return;
  }

  response.sendStatus(500);
}
