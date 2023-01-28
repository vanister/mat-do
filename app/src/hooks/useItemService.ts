import axios from 'axios';
import { ItemService } from '../services/ItemService';

let itemService: ItemService;

/**
 * Gets a singleton instance of the `ItemService`.
 */
export function useItemService(baseUrl?: string) {
  // todo - should this ItemService instance be stored in `useMemo`?
  if (!itemService) {
    itemService = new ItemService(
      axios,
      baseUrl ?? process.env.REACT_APP_API_BASE
    );
  }

  return itemService;
}
