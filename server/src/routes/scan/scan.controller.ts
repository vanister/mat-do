import { Request, Response } from 'express';
import { PostDependencies, ScanData } from './scan-types';

export function post({ validate }: PostDependencies) {
  return function (
    request: Request<any, string, ScanData>,
    response: Response<string>
  ) {
    const data = request.body;

    if (!data) {
      response.sendStatus(400);
      return;
    }

    if (!validate(data.itemId)) {
      response.status(400);
      response.send('Bad item id');
      return;
    }

    // use a service to look up the item in mongo and increase the scan count
    // log the description/location, if provided
    response.sendStatus(204);
  };
}