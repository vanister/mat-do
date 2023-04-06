import { Response } from 'firebase-functions/v1';
import { create, get, list } from './item.service';
import { Request } from 'firebase-functions/v2/https';
import { Item } from './item-type';

export async function listByUserId(req: Request, res: Response) {
  const { userId } = req.query;

  try {
    const items = await list(userId as string);

    res.send(items);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('id is required');
    return;
  }

  try {
    const item = await get(id);

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

export async function createItem(req: Request, res: Response) {
  try {
    const item = req.body;
    const newItem = await create(item);

    res.status(201).send(newItem.id);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}
