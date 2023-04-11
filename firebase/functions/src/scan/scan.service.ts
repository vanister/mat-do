import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getCollection } from '../db';
import { ScannedItem } from './scan-types';
import { Item } from '../items/item-type';
import { FieldRequiredError } from '../errors/field-required.error.ts';

const itemCollection = getCollection<Item>('items');
const scanCollection = getCollection<ScannedItem>('scans');

export async function scanned(scan: ScannedItem): Promise<void> {
  if (!scan) {
    throw new FieldRequiredError('Scanned item is required');
  }

  if (!scan.itemId) {
    throw new FieldRequiredError('ItemId is missing');
  }

  if (!scan.comments) {
    throw new FieldRequiredError('A comment is required');
  }

  const itemRef = itemCollection.doc(scan.itemId);
  const nowTimestamp = Timestamp.now();
  // update the scan count on the item
  const itemUpdates: Partial<Item> = {
    scanned: FieldValue.increment(1) as any,
    lastScanned: nowTimestamp,
    lastUpdated: nowTimestamp,
  };

  await itemRef.update(itemUpdates);

  const scanWithTimestamp: ScannedItem = {
    ...scan,
    scannedAt: nowTimestamp,
  };

  await scanCollection.add(scanWithTimestamp);
}

export async function listByItemId(
  itemId: string
): Promise<Partial<ScannedItem[]>> {
  throw new Error('not implemented');
}

export async function getById(scanId: string): Promise<ScannedItem> {
  throw new Error('not implemented');
}
