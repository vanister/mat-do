import { Request, Response } from 'express';
import { Item, PostDependencies } from './qr-types';
import { validateItem } from './utilties';

export function post({ uuid, logger }: PostDependencies) {
  return async function (
    request: Request<unknown, string, Item>,
    response: Response<string>
  ): Promise<void> {
    const item = request.body;
    const validItem = validateItem(item, true);

    if (!!validItem) {
      // log somewhere
      logger(validItem);
      response.sendStatus(400);

      return;
    }

    const id = uuid();
    // todo - save the item and return the id
    response.status(200);
    response.send(id);
  };
}
