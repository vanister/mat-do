import express from 'express';
import itemRouter from './items';
import scanRouter from './scan';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.use(express.json());
app.use('/items', itemRouter);
app.use('/scan', scanRouter);

export const api = onRequest(app);
