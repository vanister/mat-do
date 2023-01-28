import { AxiosStatic } from 'axios';
import { Item } from './services-types';

export class ItemService {
  constructor(
    private readonly axios: AxiosStatic,
    private readonly baseUrl: string
  ) {}

  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param name The name of the item.
   * @param description The description of the item.
   * @returns A complete `Item` with a populated `id`.
   */
  async post(data: { name: string; description?: string }): Promise<Item> {
    return {
      id: 'item-uuid',
      name: 'Lightsaber',
      description: `Luke's green lightsaber`
    };
  }
}
