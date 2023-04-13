import { describe, expect, test, beforeEach } from '@jest/globals';
import { list, scanned } from './scan.service';
import { getCollection } from '../db';

jest.mock('firebase-admin/firestore');
jest.mock('../db');

describe('ScanService', () => {
  const mockGetCollection = getCollection as jest.Mock;

  beforeEach(() => {
    mockGetCollection.mockClear();
  });

  describe('WHEN posting to the scan route', () => {
    test.todo('should run in a transaction');
    test.todo('should add and update the scans and items collections');

    describe('AND validating posted ScannedItem', () => {
      test('should validate the posted scanned item', () => {
        expect.assertions(3);
        expect(scanned(null as any)).rejects.toThrowError(
          'Scanned item is required'
        );

        expect(scanned({})).rejects.toThrowError('itemId is missing');
        expect(scanned({ itemId: 'anItemId' })).rejects.toThrowError(
          'Comment is required'
        );
      });
    });
  });

  test.skip('should get a list of scanned items', async () => {
    const items = await list('anItemId');

    expect(items).toBeDefined();
    expect(items).toHaveLength(3);
  });
});
