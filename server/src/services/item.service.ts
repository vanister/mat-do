import { Item } from '../routes/qr/qr-types';

export class ItemService {
  async get(id: string): Promise<Item> {
    throw new Error('not implemented');
  }

  async list(page = 1, pageSize = 25): Promise<Item[]> {
    throw new Error('not implemented');
  }
}
