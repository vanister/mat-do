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
   * @param item The item to create on the server.
   * @returns Aa `Item` with a populated `id`.
   */
  async post(item: Item): Promise<Item> {
    try {
      const id = await this.axios.post<any, string, Item>(this.baseUrl, item);

      // fill in the `id` and return a new item with it
      return { ...item, id };
    } catch (error) {
      // log?
      throw error;
    }
  }
}
