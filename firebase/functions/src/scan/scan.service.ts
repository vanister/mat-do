import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getCollection } from '../db';
import { ScannedItem } from './scan-types';
import { Item } from '../items/item-type';

const itemCollection = getCollection<Item>('items');
const scanCollection = getCollection<ScannedItem>('scans');

export async function scanned(item: ScannedItem): Promise<void> {
  if (!item) {
    throw new Error('Scanned item is required');
  }

  if (!item.itemId) {
    throw new Error('ItemId is missing');
  }

  if (!item.comments) {
    throw new Error('A comment is required');
  }

  const nowTimestamp = Timestamp.now();
  const itemWithTimestamp: ScannedItem = {
    ...item,
    scannedAt: nowTimestamp,
  };

  await scanCollection.add(itemWithTimestamp);

  const itemRef = itemCollection.doc(item.itemId);
  // update the scan count on the item
  const itemUpdates: Partial<Item> = {
    scanned: FieldValue.increment(1) as any,
    lastScanned: nowTimestamp,
    lastUpdated: nowTimestamp,
  };

  await itemRef.update(itemUpdates);
}

export async function listByItemId(
  itemId: string
): Promise<Partial<ScannedItem[]>> {
  throw new Error('not implemented');
}

export async function getById(scanId: string): Promise<ScannedItem> {
  throw new Error('not implemented');
}
