import { Item } from '../models/item';
import { ScannedItem } from '../models/scan';
import { fromBase64, toBase64 } from './base64-util';

const INFO_HASH_KEY = 'd';

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
  return `${window.location.origin}${path}/${item.id}#${INFO_HASH_KEY}=${encoded}`;
}

/**
 * Converts a base64 encoded info string into a partial Item.
 *
 * @param hash The hash fragment containing the base64 encoded info string.
 */
export function getScanItemInfo(hash: string): Partial<ScannedItem> {
  if (!hash) {
    throw new Error('missing hash');
  }

  if (!hash.includes(`${INFO_HASH_KEY}=`)) {
    throw new Error('missing hash key');
  }

  // build a search params map in case we decide to append more data in the hash
  // at a later point
  const params = new URLSearchParams(hash?.replace('#', ''));

  const base64InfoStr = params.get(INFO_HASH_KEY);
  const decodedInfoStr = fromBase64(base64InfoStr);
  const item: Partial<ScannedItem> = JSON.parse(decodedInfoStr);

  return item;
}
