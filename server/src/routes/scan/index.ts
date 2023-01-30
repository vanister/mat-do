import { Router } from 'express';
import { validate } from 'uuid';
import { post } from './scan.controller';

const router = Router();

router.post('/', post({ validate }));

export default router;
