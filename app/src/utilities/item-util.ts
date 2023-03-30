import { Item } from '../models/item';
import { toBase64 } from './base64-util';

/**
 * Converts a given Item to an absolute URL string.
 * This is useful when generating QR code data.
 *
 * @param item The item to convert to a url.
 */
export function convertToItemUrl(item: Item, path = '/items'): string {
  if (!item) {
    throw new Error('item is null');
  }

  const hashFrag = JSON.stringify({
    name: item.name,
    description: item.description
  });

  const encoded = toBase64(hashFrag);

  // create a url with name and and desc embedded in the hash
  // so we don't have to retrieve it when it is scanned
  return `${window.location.origin}${path}/${item.id}#info=${encoded}`;
}
