import { Schema, Types, Connection } from 'mongoose';

export type Scan = {
  scannedAt: Date;
  description: string;
  coordinates?: string;
};

export type Item = {
  _id?: string;
  userId: string;
  name: string;
  createdAt: Date;
  description?: string;
  contact?: string;
  scanned?: number;
  found?: boolean;
  scans?: Scan[];
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
  createdAt: { type: Date, required: true },
  description: String,
  contact: String,
  scanned: Number,
  found: Boolean,
  scans: [scan],
});

export const itemModelFactory = (conn: Connection) =>
  conn.model<Item>('Item', itemSchema);
