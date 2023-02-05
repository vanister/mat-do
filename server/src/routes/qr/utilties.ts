import { Item } from '../../models/item';

// todo - move to utilties
export function validateItem(item: Item, isNew = false): string | null {
  if (!item) {
    return 'Item is null or undefined';
  }

  if (!item.name) {
    return 'Item name is required';
  }

  return null;
}
