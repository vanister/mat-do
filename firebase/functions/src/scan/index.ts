import express from 'express';
import { getById, scan } from './scan.controller';

const router = express.Router();

router.get('/:itemId', getById);
router.post('/', scan);

export default router;
