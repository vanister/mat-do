import { Schema, model, Types } from 'mongoose';

export type Scan = {
  scannedAt: Date;
  description: string;
  coordinates?: string;
};

export type Item = {
  _id: string;
  userId: string;
  name: string;
  contact?: string;
  scanned: number;
  createdAt: string;
  found: boolean;
  scans: Scan[];
};

const scan = {
  scannedAt: { type: Date, required: true },
  description: { type: String, require: true },
  coordinates: String,
};

const itemSchema = new Schema<Item>({
  _id: Types.ObjectId,
  userId: { type: String, required: true },
  name: { type: String, required: true },
  contact: String,
  scanned: Number,
  createdAt: Date,
  found: Boolean,
  scans: [scan],
});

export const ItemModel = model<Item>('Item', itemSchema);
