import { Timestamp } from 'firebase-admin/firestore';
import { getCollection } from '../db';
import { Item } from './item-type';

const collection = getCollection<Item>('items');

export async function list(userId: string): Promise<Item[]> {
  if (!userId) {
    throw new Error('userId is required');
  }

  const snapshot = await collection
    .where('userId', '==', userId)
    .limit(25)
    .get();

  const items = snapshot.docs.map((item) => item.data());

  return items;
}

export async function get(id: string): Promise<Item> {
  if (!id) {
    throw new Error('id is required');
  }

  const snapshot = await collection.where('id', '==', id).get();
  const item = snapshot.docs[0]?.data();

  return item;
}

export async function create(item: Partial<Item>): Promise<Item> {
  if (!item) {
    throw new Error('Item cannot be null');
  }

  if (!item.name) {
    throw new Error('Item name is required');
  }

  if (!item.userId) {
    throw new Error('Item userId is required');
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
