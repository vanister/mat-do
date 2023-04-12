import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getCollection, transaction } from '../db';
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
    throw new FieldRequiredError('itemId is missing');
  }

  if (!scan.comments) {
    throw new FieldRequiredError('Comment is required');
  }

  await transaction(async (transaction, _) => {
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

    transaction.update(itemRef, itemUpdates);

    const scanRef = scanCollection.doc();
    const scanWithTimestamp = {
      ...scan,
      scannedAt: nowTimestamp,
    } as ScannedItem;

    transaction.create(scanRef, scanWithTimestamp);
  });
}

export async function listByItemId(
  itemId: string
): Promise<Partial<ScannedItem[]>> {
  const snapshot = await scanCollection.where('itemId', '==', itemId).get();
  const scans = snapshot.docs.map((scan) => ({ ...scan.data(), id: scan.id }));

  return scans;
}

export async function getById(id: string): Promise<ScannedItem> {
  throw new Error('not implemented');
}
