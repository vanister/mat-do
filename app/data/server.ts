import * as jsonServer from 'json-server';
import { resolve } from 'path';

const server = jsonServer.create();
const dbjsonPath = resolve('./data/db.json');
const router = jsonServer.router(dbjsonPath);
const middlewares = jsonServer.defaults();

console.log('db.json path:', dbjsonPath);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.path.startsWith('/items') && req.method === 'POST') {
    req.body.createdAt = new Date().toISOString();
  }

  next();
});

// intercept and handle how matdo would send responses back
server.use(({ path, method }, res, next) => {
  const oldSend = res.send;

  res.send = function (data: any) {
    if (path.startsWith('/items') && method === 'POST') {
      const item = JSON.parse(data);

      oldSend.call(res, item?.id.toString());
      return;
    }

    oldSend.call(res, data);
  } as any;

  next();
});

server.use(router);

server.listen(3030, () => {
  console.log('JSON Server is running at:', 'http://localhost:3030');
});
