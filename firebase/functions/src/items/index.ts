import express from 'express';
import {
  createItem,
  getById,
  listByUserId,
  updateItem,
} from './item.controller';

const router = express.Router();

router.get('/list', listByUserId);
router.get('/:id', getById);
router.post('/', createItem);
router.put('/', updateItem);

export default router;
