import express from 'express';
import { createItem, getById, listByUserId } from './item.controller';

const router = express.Router();

router.get('/list', listByUserId);
router.get('/:id', getById);
router.post('/', createItem);

export default router;
