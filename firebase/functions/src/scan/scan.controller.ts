import { Request, Response } from 'express';
import { ScanResponse, ScannedItem } from './scan-types';
import { scanned } from './scan.service';
import { isFound } from '../items/item.service';
import { BaseError } from '../errors/base.error';

export async function scan(
  req: Request,
  res: Response<ScanResponse>
): Promise<void> {
  try {
    const item = req.body as ScannedItem;
    const found = await isFound(item?.itemId);

    if (found) {
      res.status(200).send({ found: true, message: 'Item marked as found' });
      return;
    }

    await scanned(item);

    res.send({ found: false });
  } catch (error) {
    console.log(error);

    if (!(error instanceof BaseError)) {
      res.sendStatus(500);
      return;
    }

    res.status(400).send(error.message as any);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {}

export async function listByItemId(
  req: Request,
  res: Response
): Promise<void> {}
