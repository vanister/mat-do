import { Request, Response } from 'express';
import { create, get, list, update } from './item.service';
import { handleError } from '../errors/handler';
import { getUserId } from '../request.util';

export async function listByUserId(req: Request, res: Response): Promise<void> {
  try {
    const userId = getUserId(req);
    const items = await list(userId as string);

    res.send(items);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const item = await get(id, userId);

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
    const userId = getUserId(req);
    const item = req.body;
    const newItem = await create(item, userId);

    res.status(201).send(newItem.id);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateItem(req: Request, res: Response): Promise<void> {
  try {
    const userId = getUserId(req);
    const item = req.body;
    await update(item, userId);

    res.sendStatus(204);
  } catch (error) {
    handleError(error, res);
  }
}
