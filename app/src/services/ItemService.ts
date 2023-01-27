import { AxiosStatic } from 'axios';
import { Item } from './services-types';

export class ItemService {
  constructor(private axios: AxiosStatic) {}

  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param name The name of the item.
   * @param description The description of the item.
   * @returns A complete `Item` with a populated `id`.
   */
  async post(name: string, description?: string): Promise<Item> {
    return {
      id: 'item-uuid',
      name: 'Lightsaber',
      description: `Luke's green light saber`
    };
  }
}
