import { Timestamp } from 'firebase-admin/firestore';

export type ScannedItem = {
  itemId: string;
  coordinates?: Coordinates;
  comments: string;
  scannedAt: Timestamp;
};

export type Coordinates = {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude?: number;
};
