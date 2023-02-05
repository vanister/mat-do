import { Request, Response } from 'express';
import { Item } from '../../models/item';
import { ListDependencies, PostDependencies } from './qr-types';
import { validateItem } from './utilties';

export function list({ itemService }: ListDependencies) {
  return async function (
    request: Request<{ userId: string; page?: number; size?: number }, Item[]>,
    response: Response<Item[]>
  ): Promise<void> {
    const { userId } = request.params;
    const page = request.params.page || 1;
    const size = request.params.size || 25;

    // return 400 if userId is missing
    if (!userId) {
      response.sendStatus(400);
      return;
    }
    // look up all of the items and page
    const items = await itemService.list(userId);
    // return 404 if no items found
    if (items.length === 0) {
      response.sendStatus(404);
      return;
    }
    // return 200 with list of items
    response.status(200);
    response.send(items);
  };
}

export function post({ uuid, logger }: PostDependencies) {
  return async function (
    request: Request<unknown, string, Item>,
    response: Response<string>
  ): Promise<void> {
    const item = request.body;
    const errors = validateItem(item, true);

    if (!!errors) {
      // log somewhere
      logger(errors);
      response.sendStatus(400);

      return;
    }

    const id = uuid();
    // todo - save the item and return the id
    response.status(200);
    response.send(id);
  };
}
