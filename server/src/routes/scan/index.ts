import { Router, Request, Response } from 'express';
import { ScanData } from './scan-types';
import { post } from './scan.controller';

const router = Router();

router.post('/', post());

export default router;
