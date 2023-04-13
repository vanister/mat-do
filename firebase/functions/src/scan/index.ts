import express from 'express';
import { getById, listByItemId, scan } from './scan.controller';

const router = express.Router();

router.get('/list', listByItemId);
router.get('/:id', getById);
router.post('/', scan);

export default router;
