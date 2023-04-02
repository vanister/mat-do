import { url } from 'inspector';
import { Item } from '../models/item';
import { fromBase64, toBase64 } from './base64-util';

/**
 * Converts a given Item to an absolute URL string.
 * This is useful when generating QR code data.
 *
 * @param item The item to convert to a url.
 */
export function toScannableItemUrl(item: Item, path = '/scan'): string {
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

/**
 * Converts a base64 encoded info string into a partial Item.
 *
 * @param hash The hash fragment containing the base64 encoded info string.
 */
export function getScanItemInfo(hash: string): Partial<Item> {
  if (!hash) {
    throw new Error('hash');
  }

  if (!hash.includes('info=')) {
    throw new Error('Missing info param');
  }

  const params = new URLSearchParams(hash.replace('#', ''));

  if (!params.has('info')) {
    throw new Error('Missing info param');
  }

  const base64InfoStr = params.get('info');
  const decodedInfoStr = fromBase64(base64InfoStr);
  const item: Partial<Item> = JSON.parse(decodedInfoStr);

  return item;
}