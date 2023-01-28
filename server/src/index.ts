require('dotenv').config();

import express, { json } from 'express';
import scanRouter from './routes/scan';
import qrRouter from './routes/qr';

// todo - connect to mongo

const app = express();

// we accept only application/json data
app.use(json());

// routes
app.use('/scan', scanRouter);
app.use('/qr', qrRouter);

// 404
app.all('*', (req, res) => {
  res.status(404).send('Not found');
});
