import { FirestoreTimestamp } from './firestore';

export type Item = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  scanned?: number;
  found?: boolean;
  createdAt: string;
  lastUpdated?: FirestoreTimestamp;
  lastScanned?: FirestoreTimestamp;
};
