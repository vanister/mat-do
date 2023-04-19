import express from 'express';
import { getById, listByItemId, scan } from './scan.controller';
import { validateToken } from '../middleware/validate-token.middleware';

const router = express.Router();

router.get('/list', validateToken, listByItemId);
router.get('/:id', getById);
router.post('/', scan);

export default router;
