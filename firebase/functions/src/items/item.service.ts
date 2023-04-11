import { Timestamp } from 'firebase-admin/firestore';
import { getCollection } from '../db';
import { Item } from './item-type';
import { FieldRequiredError } from '../errors/field-required.error.ts';
import { NotFoundError } from '../errors/not-found.error';

const collection = getCollection<Item>('items');

export async function list(userId: string, limit = 25): Promise<Item[]> {
  if (!userId) {
    throw new FieldRequiredError('userId is required');
  }

  const snapshot = await collection
    .where('userId', '==', userId)
    .limit(limit)
    .get();

  const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));

  return items;
}

export async function get(id: string): Promise<Item> {
  if (!id) {
    throw new FieldRequiredError('id is required');
  }

  const snapshot = await collection.doc(id).get();

  if (!snapshot.exists) {
    return null;
  }

  const item = snapshot.data();

  return { id: snapshot.id, ...item };
}

export async function create(item: Partial<Item>): Promise<Item> {
  if (!item) {
    throw new FieldRequiredError('Item cannot be null');
  }

  if (!item.name) {
    throw new FieldRequiredError('Item name is required');
  }

  if (!item.userId) {
    throw new FieldRequiredError('Item userId is required');
  }

  const fullItem = {
    ...item,
    createdAt: Timestamp.now(),
    found: false,
    scanned: 0,
    lastUpdated: Timestamp.now(),
  } as Item;

  const { id } = await collection.add(fullItem);

  fullItem.id = id;

  return fullItem;
}

export async function isFound(id: string): Promise<boolean> {
  const snapshot = await collection.doc(id).get();

  if (!snapshot.exists) {
    throw new NotFoundError('document not found');
  }

  return !!snapshot.data().found;
}
