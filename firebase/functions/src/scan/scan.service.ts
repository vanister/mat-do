import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getCollection } from '../db';
import { ScannedItem } from './scan-types';
import { Item } from '../items/item-type';
import { FieldRequiredError } from '../errors/field-required.error.ts';

const itemCollection = getCollection<Item>('items');
const scanCollection = getCollection<ScannedItem>('scans');

export async function scanned(scan: Partial<ScannedItem>): Promise<void> {
  if (!scan) {
    throw new FieldRequiredError('Scanned item is required');
  }

  if (!scan.itemId) {
    throw new FieldRequiredError('ItemId is missing');
  }

  if (!scan.comments) {
    throw new FieldRequiredError('A comment is required');
  }

  // todo - wrap in a transaction

  const itemRef = itemCollection.doc(scan.itemId);
  const nowTimestamp = Timestamp.now();
  // update the scan count on the item
  const itemUpdates: Partial<Item> = {
    scanned: FieldValue.increment(1) as any,
    lastScanned: nowTimestamp,
    lastUpdated: nowTimestamp,
  };

  // if this scan includes a location, set it to the last know location
  if (!!scan.coordinates) {
    itemUpdates.lastKnownLocation = scan.coordinates;
  }

  await itemRef.update(itemUpdates);

  const scanWithTimestamp = {
    ...scan,
    scannedAt: nowTimestamp,
  } as ScannedItem;

  await scanCollection.add(scanWithTimestamp);
}

export async function listByItemId(
  itemId: string
): Promise<Partial<ScannedItem[]>> {
  throw new Error('not implemented');
}

export async function getById(id: string): Promise<ScannedItem> {
  throw new Error('not implemented');
}
