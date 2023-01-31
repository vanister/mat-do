import { Item } from './qr-types';

// todo - move to utilties
export function validateItem(item: Item, isNew = false): string | null {
  if (!item) {
    return 'Item is null or undefined';
  }

  if (!isNew && !item.id) {
    return 'Item id is required';
  }

  if (!item.name) {
    return 'Item name is required';
  }

  return null;
}
