import axios, { AxiosResponse, Method } from 'axios';
import { Item } from './services-types';

export interface ItemService {
  /**
   * Gets a list of Items belonging to the current authenticated user.
   */
  list(): Promise<Item[]>;
  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param item The item to create on the server.
   */
  create(item: Item): Promise<string>;
}

export type ItemsApiOptions = {
  accessToken: string;
  baseUrl?: string;
  path?: string;
};

export function itemService({
  accessToken,
  path = '/items',
  baseUrl = process.env.REACT_APP_API_BASE_URL
}: ItemsApiOptions): ItemService {
  async function list(): Promise<Item[]> {
    const response = await sendRequest<Item[]>('/');

    return response.data;
  }

  async function create(item: Item): Promise<string> {
    try {
      const response = await sendRequest<string>('/', 'POST', item);
      // create the a url string with the path the the new item
      const id = response.data;

      return id;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  // todo - move to common api function
  async function sendRequest<T>(
    url: string,
    method: Method = 'GET',
    data?: any,
    additionalHeaders: { [name: string]: string } = {}
  ): Promise<AxiosResponse<T>> {
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

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  return {
    list,
    create
  };
}
