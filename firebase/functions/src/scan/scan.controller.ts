import { Request, Response } from 'express';
import { ScannedItem } from './scan-types';
import { scanned } from './scan.service';

export async function scan(req: Request, res: Response): Promise<void> {
  try {
    const item = req.body as ScannedItem;

    await scanned(item);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {}

export async function list(req: Request, res: Response): Promise<void> {}
