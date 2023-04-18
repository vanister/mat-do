import { Response, Request } from 'express';
import { NextFunction } from 'express';
import { ItemService } from './item.service';
import { Item } from './item-type';
import { ServiceRequest } from '../core';
import { CollectionReference } from 'firebase-admin/firestore';

export type MiddlewareFunction<TRequeset = Request, TResponse = Response> = (
  req: TRequeset,
  res: TResponse,
  next: NextFunction
) => Promise<Response | void>;

export type ItemServiceInjectorOptions = {
  collection: CollectionReference<Item>;
};

export function itemServiceInjector({
  collection,
}: ItemServiceInjectorOptions): MiddlewareFunction<ServiceRequest> {
  return async function middleware(
    req: ServiceRequest,
    _: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { baseUrl, user, uid } = req;

    if (!(user && uid)) {
      return next();
    }

    switch (baseUrl.toLowerCase()) {
      case '/items':
        req.itemService = new ItemService(collection, uid);

        break;

      case '/scan':
        break;
    }

    next();
  };
}
