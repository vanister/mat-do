import { Response } from 'firebase-functions/v1';
import { create, get, list } from './item.service';
import { Request } from 'firebase-functions/v2/https';
import { handleError } from '../errors/handler';

export async function listByUserId(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.query;
    const items = await list(userId as string);

    res.send(items);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const item = await get(id);

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  } catch (error) {
    handleError(error, res);
  }
}

export async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const item = req.body;
    const newItem = await create(item);

    res.status(201).send(newItem.id);
  } catch (error) {
    handleError(error, res);
  }
}
