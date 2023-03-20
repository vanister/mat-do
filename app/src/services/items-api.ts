import axios, { Method } from 'axios';
import { Item } from './services-types';

export interface ItemsApi {
  /**
   * Gets a list of Items belonging to the current authenticated user.
   */
  list(): Promise<Item[]>;
  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param item The item to create on the server.
   */
  create(item: Item): Promise<Item>;
}

export type ItemsApiOptions = {
  accessToken: string;
  baseUrl?: string;
  path?: string;
};

export function itemsApi({
  accessToken,
  path = '/items',
  baseUrl = process.env.REACT_APP_API_BASE_URL
}: ItemsApiOptions): ItemsApi {
  async function list(): Promise<Item[]> {
    const items = await sendRequest<Item[]>('/');

    return items;
  }

  async function create(item: Item): Promise<Item> {
    try {
      const id = await sendRequest<string>('/', 'POST', item);

      // fill in the `id` and return a new item with it
      return { ...item, id };
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }

  // todo - move to common api function
  async function sendRequest<T>(
    url: string,
    method: Method = 'GET',
    data?: any,
    additionalHeaders: { [name: string]: string } = {}
  ): Promise<T> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      ...additionalHeaders
    };

    try {
      const response = await axios.request<T>({
        method,
        baseURL: `${baseUrl}${path}`,
        url,
        data,
        headers
      });

      return response?.data;
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }

  return {
    list,
    create
  };
}
