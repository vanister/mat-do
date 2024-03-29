import { FirestoreTimestamp } from './firestore';

export type ScannedItem = {
  id: string;
  name: string;
  description: string;
  scannedAt: FirestoreTimestamp;
  comments: string;
  coordinates?: ItemCoordinates;
};

export type ItemCoordinates = {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude?: number;
};
