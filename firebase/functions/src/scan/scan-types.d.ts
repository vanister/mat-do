import { Timestamp } from 'firebase-admin/firestore';

export type ScannedItem = {
  itemId: string;
  comments: string;
  coordinates?: Coordinates;
  scannedAt: Timestamp;
};

export type Coordinates = {
  longitude: number;
  latitude: number;
  accuracy?: number;
  altitude?: number;
};

export type ScanResponse = {
  found: boolean;
  message?: string;
};
