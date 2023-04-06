import express from 'express';
import itemRouter from './items';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.use(express.json());
app.use('/items', itemRouter);

export const api = onRequest(app);
