import { CollectionReference, Timestamp } from 'firebase-admin/firestore';
import { Item } from './item-type';
import { ValidationError } from '../errors/field-required.error.ts';
import { NotFoundError } from '../errors/not-found.error';

export interface InjectableService {}

export class ItemService implements InjectableService {
  constructor(
    private collection: CollectionReference<Item>,
    private userId: string
  ) {}

  async list(limit = 25): Promise<Item[]> {
    const snapshot = await this.collection
      .where('userId', '==', this.userId)
      .limit(limit)
      .get();

    const items = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    return items;
  }

  async get(id: string): Promise<Item> {
    if (!id) {
      throw new ValidationError('id is required');
    }

    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const item = snapshot.data();

    // make sure the item belongs to the user
    if (!this.isUserItem(item)) {
      return null;
    }

    return { id: snapshot.id, ...item };
  }

  async create(item: Partial<Item>): Promise<Item> {
    this.validateItem(item as Item);

    const fullItem = {
      ...item,
      createdAt: Timestamp.now(),
      found: false,
      scanned: 0,
      lastUpdated: Timestamp.now(),
    } as Item;

    const { id } = await this.collection.add(fullItem);

    fullItem.id = id;

    return fullItem;
  }

  async update(item: Item): Promise<void> {
    this.validateItem(item);

    const { id, name, description, found } = item;
    const itemRef = this.collection.doc(id);
    const snapshot = await itemRef.get();

    if (!snapshot.exists) {
      throw new NotFoundError();
    }

    const itemUpdates: Partial<Item> = {
      name,
      description,
      found,
      lastUpdated: Timestamp.now(),
    };

    await itemRef.update(itemUpdates);
  }

  /**
   * Determines if an item is marked as `found` by the user.
   *
   * @param id The id of the Item document.
   */
  async isFound(id: string): Promise<boolean> {
    // TODO - move to scan service
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      throw new NotFoundError('document not found');
    }

    return !!snapshot.data().found;
  }

  private validateItem(item: Item): void {
    if (!item) {
      throw new ValidationError('Item cannot be null');
    }

    if (!item.name) {
      throw new ValidationError('Item name is required');
    }

    if (!item.userId) {
      throw new ValidationError('Item userId is required');
    }

    if (!this.isUserItem(item)) {
      throw new ValidationError('Item does not belong to this user');
    }
  }

  private isUserItem(item: Item): boolean {
    return item?.userId === this.userId;
  }
}
