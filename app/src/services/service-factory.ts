import axios from 'axios';
import { ItemService } from './ItemService';

let itemService: ItemService;

/**
 * Gets a singleton instance of the `ItemService`.
 */
export function getItemService(
  accessToken: string,
  baseUrl = process.env.REACT_APP_API_BASE_URL,
  singleton = false
): ItemService {
  if (!singleton) {
    return new ItemService(axios, baseUrl, accessToken);
  }

  if (!itemService) {
    itemService = new ItemService(axios, baseUrl, accessToken);
  }

  return itemService;
}
