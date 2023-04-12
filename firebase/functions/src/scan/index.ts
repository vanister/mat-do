import express from 'express';
import { get, list, scan } from './scan.controller';

const router = express.Router();

router.get('/list', list);
router.get('/:id', get);
router.post('/', scan);

export default router;
