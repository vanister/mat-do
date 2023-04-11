import admin from 'firebase-admin';
import {
  CollectionReference,
  Firestore,
  Transaction,
} from 'firebase-admin/firestore';

export type TransactionFunction = (
  /** The transaction object. */
  transaction: Transaction,
  /** The firestore db. */
  db: Firestore
) => Promise<void>;

const app = admin.initializeApp();

export const firestore = admin.firestore(app);

/**
 * Gets a collection reference from cloud firestore.
 *
 * @param path The path to the collection.
 */
export function getCollection<T>(path: string): CollectionReference<T> {
  const collectionRef = firestore.collection(path) as CollectionReference<T>;

  return collectionRef;
}

/**
 * Wraps firestore operations around a transaction.
 *
 * The transaction will commit if there are not errors thrown
 * in the operation.
 *
 * @param operation The transaction operation function to execute.
 */
export async function transaction(
  operation: TransactionFunction
): Promise<void> {
  await firestore.runTransaction((transaction) =>
    operation(transaction, firestore)
  );
}
