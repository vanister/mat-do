import { Timestamp } from 'firebase-admin/firestore';

export type Item = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  scanned: number;
  found: boolean;
  createdAt: Timestamp;
  lastUpdated: Timestamp;
  lastScanned?: Timestamp;
};
