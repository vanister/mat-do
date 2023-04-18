import { UnauthorizedError } from './errors/unauthorized.error';
import { ItemService } from './items/item.service';
import { ServiceRequest, UserRequest } from './core';

export function getUserId(req: UserRequest) {
  const { user } = req;

  if (!user) {
    throw new UnauthorizedError();
  }

  return user.uid;
}

export function getItemService(req: ServiceRequest): ItemService {
  // TODO - consider instantiating the item service here as a singleton
  const service = req.itemService;

  if (!service) {
    throw new Error('ItemService not registered with the injector');
  }

  return service;
}
