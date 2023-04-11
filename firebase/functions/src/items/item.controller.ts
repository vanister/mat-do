import { Response } from 'firebase-functions/v1';
import { create, get, list } from './item.service';
import { Request } from 'firebase-functions/v2/https';
import { FieldRequiredError } from '../errors/field-required.error.ts';
import { BaseError } from '../errors/base.error';

export async function listByUserId(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;

  try {
    const items = await list(userId as string);

    res.send(items);
  } catch (error) {
    console.error(error);

    if (!(error instanceof BaseError)) {
      res.sendStatus(500);
      return;
    }

    res.status(400).send(error.message);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const item = await get(id);

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  } catch (error) {
    console.error(error);

    if (!(error instanceof BaseError)) {
      res.sendStatus(500);
      return;
    }

    res.status(400).send(error.message);
  }
}

export async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const item = req.body;
    const newItem = await create(item);

    res.status(201).send(newItem.id);
  } catch (error) {
    console.error(error);

    if (!(error instanceof BaseError)) {
      res.sendStatus(500);
      return;
    }

    res.status(400).send(error.message);
  }
}
