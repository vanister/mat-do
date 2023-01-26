import { connect } from 'mongoose';
import { Item } from '../models/item';

export async function getById(id: string): Promise<Item> {
  throw new Error('not implemented');
}
