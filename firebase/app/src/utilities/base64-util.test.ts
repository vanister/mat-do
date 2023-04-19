import { describe, expect, test } from '@jest/globals';

import { toBase64, fromBase64 } from './base64-util';

describe('Base64 Utilities', () => {
  test('should encode a json string', () => {
    const data = { description: 'Stolen from Cassian', name: "Jyn's Blaster" };
    const expected =
      'eyJkZXNjcmlwdGlvbiI6IlN0b2xlbiBmcm9tIENhc3NpYW4iLCJuYW1lIjoiSnluJ3MgQmxhc3RlciJ9';

    const encoded = toBase64(JSON.stringify(data));

    expect(encoded).toEqual(expected);
  });

  test('should decode a string back to json', () => {
    const encoded =
      'eyJkZXNjcmlwdGlvbiI6IlN0b2xlbiBmcm9tIENhc3NpYW4iLCJuYW1lIjoiSnluJ3MgQmxhc3RlciJ9';

    const expected = {
      name: "Jyn's Blaster",
      description: 'Stolen from Cassian'
    };

    const data = JSON.parse(fromBase64(encoded));

    expect(data).toEqual(expected);
  });
});
