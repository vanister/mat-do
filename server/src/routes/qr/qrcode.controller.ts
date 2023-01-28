import { Request, Response } from 'express';
import { Item, PostDependencies } from './qr-types';

export function post({ uuid }: PostDependencies) {
  return async function (
    request: Request<any, string, Item>,
    response: Response<string>
  ): Promise<string> {
    throw new Error('not implemented');
  };
}
