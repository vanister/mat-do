import express from 'express';
import { validateToken } from '../middleware/validate-token.middleware';
import {
  createItem,
  getById,
  listByUserId,
  updateItem,
} from './item.controller';
import { itemServiceInjector } from './item-service.middleware';
import { getCollection } from '../db';
import { Item } from './item-type';

const collection = getCollection<Item>('items');
const router = express.Router();

router.use(validateToken);
router.use(itemServiceInjector({ collection }));

router.get('/list', listByUserId);
router.get('/:id', getById);
router.post('/', createItem);
router.put('/', updateItem);

export default router;
