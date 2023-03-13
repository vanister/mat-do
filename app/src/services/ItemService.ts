import { AxiosStatic, Method } from 'axios';
import { Item } from './services-types';

export class ItemService {
  constructor(
    private readonly axios: AxiosStatic,
    private readonly baseUrl: string,
    private readonly accessToken: string
  ) {}

  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param item The item to create on the server.
   */
  async create(item: Item): Promise<Item> {
    try {
      const id = await this.sendRequest<string>('/items', 'POST', item);

      // fill in the `id` and return a new item with it
      return { ...item, id };
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }

  async list(): Promise<Item[]> {
    const items = await this.sendRequest<Item[]>('/items');

    return items;
  }

  async sendRequest<T>(
    url: string,
    method: Method = 'GET',
    data?: any,
    additionalHeaders: { [name: string]: string } = {}
  ): Promise<T> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      ...additionalHeaders
    };

    try {
      const response = await this.axios.request<T>({
        method,
        baseURL: this.baseUrl,
        url,
        data,
        headers
      });

      return response.data;
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }
}
