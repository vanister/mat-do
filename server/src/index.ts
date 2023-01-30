require('dotenv').config();

import express, { json } from 'express';
import scanRouter from './routes/scan';
import qrRouter from './routes/qr';
import { connect } from 'mongoose';

const app = express();

// const {
//   MATDO_MONGO_CONN_STR,
//   MATDO_MONGO_SERVER,
//   MATDO_MONGO_DB,
//   MATDO_MONGO_UN,
//   MATDO_MONGO_PW,
// } = process.env;

// // use the full connection string if one is set
// if (MATDO_MONGO_CONN_STR) {
//   connect(MATDO_MONGO_CONN_STR);
// } else {
//   connect(MATDO_MONGO_SERVER, {
//     dbName: MATDO_MONGO_DB,
//     user: MATDO_MONGO_UN,
//     pass: MATDO_MONGO_PW,
//   });
// }

// we accept only application/json data
app.use(json());

// routes
app.use('/scan', scanRouter);
app.use('/qr', qrRouter);

// 404
app.all('*', (req, res) => {
  res.status(404).send('Not found');
});
