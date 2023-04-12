import { Request, Response } from 'express';
import { ScanResponse, ScannedItem } from './scan-types';
import { getById, listByItemId, scanned } from './scan.service';
import { isFound } from '../items/item.service';
import { handleError } from '../errors/handler';

export async function scan(
  req: Request,
  res: Response<ScanResponse>
): Promise<void> {
  try {
    const item = req.body as ScannedItem;
    const found = await isFound(item?.itemId);

    if (found) {
      res.status(200).send({ found: true });
      return;
    }

    await scanned(item);

    res.send({ found: false });
  } catch (error) {
    handleError(error, res);
  }
}

export async function get(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const item = await getById(id);

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  } catch (error) {
    handleError(error, res);
  }
}

export async function list(req: Request, res: Response): Promise<void> {
  try {
    const { itemId } = req.query;
    const items = await listByItemId(itemId as string);

    res.send(items);
  } catch (error) {
    handleError(error, res);
  }
}
