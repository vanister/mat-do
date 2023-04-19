import { Request, Response } from 'express';
import { ScanResponse, ScannedItem } from './scan-types';
import { get, list, scanned } from './scan.service';
import { handleError } from '../errors/handler';
import { getItemService } from '../request.util';
import { ServiceRequest } from '../core';

export async function scan(
  req: Request,
  res: Response<ScanResponse>
): Promise<void> {
  try {
    const itemService = getItemService(req as ServiceRequest, true);
    const item = req.body as ScannedItem;
    const found = await itemService.isFound(item?.itemId);

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

// TODO - this needs auth
export async function listByItemId(req: Request, res: Response): Promise<void> {
  try {
    const { itemId } = req.query;
    const items = await list(itemId as string);

    res.send(items);
  } catch (error) {
    handleError(error, res);
  }
}
