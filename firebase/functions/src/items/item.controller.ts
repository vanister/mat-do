import { Request, Response } from 'express';
import { handleError } from '../errors/handler';
import { getItemService, getUserId } from '../request.util';
import { ServiceRequest } from '../core';

export async function listByUserId(
  req: ServiceRequest,
  res: Response
): Promise<void> {
  try {
    const itemService = getItemService(req);
    const items = await itemService.list();

    res.send(items);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getById(
  req: ServiceRequest,
  res: Response
): Promise<void> {
  try {
    const itemService = getItemService(req);
    const { id } = req.params;
    const item = await itemService.get(id);

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  } catch (error) {
    handleError(error, res);
  }
}

export async function createItem(
  req: ServiceRequest,
  res: Response
): Promise<void> {
  try {
    const itemService = getItemService(req);
    const item = req.body;
    const { id } = await itemService.create(item);

    res.setHeader('Location', `/items/${id}`);
    res.status(201).send(id);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateItem(
  req: ServiceRequest,
  res: Response
): Promise<void> {
  try {
    const itemService = getItemService(req);
    const item = req.body;
    await itemService.update(item);

    res.sendStatus(204);
  } catch (error) {
    handleError(error, res);
  }
}
