import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getCollection, transaction } from '../db';
import { ScannedItem } from './scan-types';
import { Item } from '../items/item-type';
import { ValidationError } from '../errors/field-required.error.ts';

const itemCollection = getCollection<Item>('items');
const scanCollection = getCollection<ScannedItem>('scans');

export async function scanned(scan: Partial<ScannedItem>): Promise<void> {
  if (!scan) {
    throw new ValidationError('Scanned item is required');
  }

  if (!scan.itemId) {
    throw new ValidationError('itemId is missing');
  }

  if (!scan.comments) {
    throw new ValidationError('Comment is required');
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
      lastComment: scan.comments,
      lastKnownLocation: scan.coordinates,
    };

    transaction.update(itemRef, itemUpdates);

    const scanRef = scanCollection.doc();
    const scanWithTimestamp = {
      ...scan,
      scannedAt: nowTimestamp,
    } as ScannedItem;

    transaction.create(scanRef, scanWithTimestamp);
  });
}

export async function list(itemId: string): Promise<Partial<ScannedItem[]>> {
  const snapshot = await scanCollection.where('itemId', '==', itemId).get();
  const scans = snapshot.docs.map((scan) => ({ ...scan.data(), id: scan.id }));

  return scans;
}

export async function get(id: string): Promise<ScannedItem> {
  const snapshot = await scanCollection.doc(id).get();

  if (!snapshot.exists) {
    return null;
  }

  const scan: ScannedItem = { ...snapshot.data(), id: snapshot.id };

  return scan;
}
