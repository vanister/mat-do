import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse, Method } from 'axios';
import { useEffect, useState } from 'react';
import { useAppSettings } from '../AppSettingsContext';
import { Item } from '../models/item';

export interface ItemService {
  isReady: boolean;

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

  /**
   * Converts a given Item to an absolute URL string.
   * This is useful when generating QR code data.
   *
   * @param item The item to convert to a url.
   */
  convertToUrl(item: Item): string;
}

export function useItemService(): ItemService {
  const path = '/items';
  const { baseUrl } = useAppSettings();
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      setAccessToken(token);
    });
  }, [getAccessTokenSilently]);

  async function list(): Promise<Item[]> {
    const response = await sendRequest<Item[]>('/');

    return response.data;
  }

  async function create(item: Item): Promise<Item> {
    try {
      const itemWithUserId = { ...item, userId: user.sub };
      const response = await sendRequest<string>('/', 'POST', itemWithUserId);
      const id = response.data;

      return { ...item, id };
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

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

  function convertToUrl(item: Item): string {
    if (!item) {
      throw new Error('item is null');
    }

    return `${window.location.origin}${path}/${item.id}`;
  }

  return {
    isReady: !isLoading,
    list,
    create,
    convertToUrl
  };
}
