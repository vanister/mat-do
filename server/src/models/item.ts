import { Schema, model, Types } from 'mongoose';

export type ScanDbo = {
  scannedAt: Date;
  description: string;
  coordinates?: string;
};

export type ItemDbo = {
  _id: string;
  userId: string;
  name: string;
  createdAt: Date;
  contact?: string;
  scanned?: number;
  found?: boolean;
  scans?: ScanDbo[];
};

const scan = {
  scannedAt: { type: Date, required: true },
  description: { type: String, require: true },
  coordinates: String,
};

const itemSchema = new Schema<ItemDbo>({
  _id: Types.ObjectId,
  userId: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  contact: String,
  scanned: Number,
  found: Boolean,
  scans: [scan],
});

export const ItemEntity = model<ItemDbo>('Item', itemSchema);
