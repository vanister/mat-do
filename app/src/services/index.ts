import axios from 'axios';
import { ItemService } from './ItemService';

let itemService: ItemService;

/**
 * Gets a singleton instance of the `ItemService`.
 */
export function getItemService(baseUrl?: string): ItemService {
  // todo - should this ItemService instance be stored in `useMemo`?
  if (!itemService) {
    itemService = new ItemService(
      axios,
      baseUrl ?? process.env.REACT_APP_API_BASE_URL
    );
  }

  return itemService;
}
