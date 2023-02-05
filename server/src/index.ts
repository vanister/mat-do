require('dotenv').config();

import express, { json } from 'express';
import scanRouter from './routes/scan';
import qrRouter from './routes/qr';
import { createConnection } from 'mongoose';
import { ItemService } from './services/item.service';
import { itemModelFactory } from './models/item';
import { registerService } from './services/service-injector';

const app = express();
const port = process.env.PORT || 4000;
const connection = createConnection(process.env.MATDO_MONGO_CONN_STR);

// todo - move to service setup module
const itemModel = itemModelFactory(connection);

registerService(ItemService.NAME, new ItemService(itemModel));

// we accept only application/json data
app.use(json());

// routes
app.use('/scan', scanRouter);
app.use('/qr', qrRouter);

// 404
app.all('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Mat-do is listening on port: ${port}`);
});
