import { Document, Model } from 'mongoose';
import { Item } from '../models/item';

type ItemDocument = Document<unknown, any, Item> &
  Item &
  Required<{ _id: string }>;

export class ItemService {
  static NAME = 'ItemService';

  // todo - do we need to wrap mongoose models around a repository?
  //        mongoose schema/models are essentially repositories
  constructor(private readonly itemModel: Model<Item>) {}

  async get(id: string): Promise<Item> {
    if (!id) {
      throw new Error('id');
    }

    const doc = await this.itemModel.findById(id);

    if (!doc) {
      // todo - throw error instead?
      return null;
    }

    const item = this.convertToItem(doc);

    return item;
  }

  async list(userId: string, page = 1, pageSize = 25): Promise<Item[]> {
    const itemDocs: ItemDocument[] = await this.itemModel
      .find({ userId })
      .exec();

    const items = itemDocs.map((doc) => this.convertToItem(doc));

    return items;
  }

  private convertToItem(doc: ItemDocument): Item {
    const {
      _id,
      createdAt,
      name,
      userId,
      contact,
      description,
      found,
      scanned,
      scans,
    } = doc;

    return {
      _id,
      createdAt,
      name,
      userId,
      contact,
      description,
      found,
      scanned,
      scans,
    };
  }
}
