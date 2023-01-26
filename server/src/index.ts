import express, { json } from 'express';
import scan from './routes/scan';

const app = express();

// we accept only application/json data
app.use(json());

app.use('/scan', scan);

// 404
app.all('*', (req, res) => {
  res.status(404).send('Not found');
});
