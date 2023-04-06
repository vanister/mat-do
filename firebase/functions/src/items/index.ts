import { onRequest } from 'firebase-functions/v2/https';
import { createItem, getById, listByUserId } from './item.controller';

export const list = onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    res.sendStatus(405);
    return;
  }

  await listByUserId(req, res);
});

export const get = onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    res.sendStatus(405);
    return;
  }

  await getById(req, res);
});

export const create = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.sendStatus(405);
    return;
  }

  await createItem(req, res);
});
