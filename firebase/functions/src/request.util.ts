import { UnauthorizedError } from './errors/unauthorized.error';
import { InjectableService, ItemService } from './items/item.service';
import { ServiceRequest, UserRequest } from './core';
import { getCollection } from './db';
import { Item } from './items/item-type';
import { Request } from 'express';

const injector = new Map<string, InjectableService>();

export function getUserId(req: UserRequest) {
  const { user } = req;

  if (!user) {
    throw new UnauthorizedError();
  }

  return user.uid;
}

export function getItemService(
  req: ServiceRequest,
  instance = false
): ItemService {
  const serviceName = 'itemservice';
  const collection = getCollection<Item>('items');
  const { uid } = req;

  if (instance) {
    return new ItemService(collection, uid);
  }

  let service = injector.get(serviceName) as ItemService;

  if (!service) {
    service = new ItemService(collection, uid);
    injector.set(serviceName, service);
  }

  return service;
}

export function getScanService(req: Request, instance = false) {
  const serviceName = 'scanservice';
  const collection = getCollection<Item>('scans');
  const { uid } = req as ServiceRequest;

  throw new Error('not implemented');

  // if (instance) {
  //   return new ItemService(collection, uid);
  // }

  // let service = injector.get(serviceName) as ItemService;

  // if (!service) {
  //   service = new ItemService(collection, uid);
  //   injector.set(serviceName, service);
  // }

  // return service;
}
