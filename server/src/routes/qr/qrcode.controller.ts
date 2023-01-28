import { Request, Response } from 'express';
import { Item, PostDependencies } from './qr-types';

export function post({ uuid, logger }: PostDependencies) {
  return async function (
    request: Request<any, string, Item>,
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

function validateItem(item: Item, isNew = false): string | null {
  if (!item) {
    return 'Item is null or undefined';
  }

  if (!isNew && !item.id) {
    return 'Item id is required';
  }

  if (!item.name) {
    return 'Item name is required';
  }

  return null;
}
