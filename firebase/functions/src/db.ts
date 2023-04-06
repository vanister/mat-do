import admin from 'firebase-admin';
import { CollectionReference } from 'firebase-admin/firestore';

admin.initializeApp();

export const firestore = admin.firestore();

export function getCollection<T>(path: string): CollectionReference<T> {
  const collectionRef = firestore.collection(path) as CollectionReference<T>;

  return collectionRef;
}
