import { Router } from 'express';
import { v4 } from 'uuid';
import { post } from './qrcode.controller';

const router = Router();

router.post('/', post({ uuid: v4, logger: console.log }));

export default router;
