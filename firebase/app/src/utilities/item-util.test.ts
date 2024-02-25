import { describe, expect, test } from '@jest/globals';
import { Item } from '../models/item';
import { getScanItemInfo } from './item-util';

describe('Item Utilities', () => {
  const hash =
    '#d=eyJuYW1lIjoiSnluJ3MgQmxhc3RlciIsImRlc2NyaXB0aW9uIjoiVGhlIG9uZSBzaGUgc3RvbGUgZnJvbSBDYXNzaWFuIn0=';

  const item: Partial<Item> = {
    name: `Jyn's Blaster`,
    description: 'The one she stole from Cassian'
  };

  describe('WHEN getting a scanned item info', () => {
    test('should return a partial Item', () => {
      const scannedItem = getScanItemInfo(hash);

      expect(scannedItem).toEqual(item);
    });

    test(`should throw an error if 'info' param is missing`, () => {
      const badHash = '#notinfo=somebase64encodedstring';

      expect(() => getScanItemInfo(badHash)).toThrowError('missing hash key');
    });

    test('should throw if hash is falsy', () => {
      expect(() => getScanItemInfo('')).toThrowError('missing hash');
      expect(() => getScanItemInfo(null)).toThrowError('missing hash');
      expect(() => getScanItemInfo(undefined)).toThrowError('missing hash');
    });
  });
});
