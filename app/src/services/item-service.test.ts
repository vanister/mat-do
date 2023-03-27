import { describe, expect, test, beforeEach } from '@jest/globals';
import axios from 'axios';

import { ItemService, itemService } from './item-service';

jest.mock('axios', () => ({
  request: jest.fn()
}));

describe('ItemService', () => {
  const baseUrl = 'unittest.matdo.com/api';
  const path = '/items';
  const accessToken = 'some.base64encoded.string';

  test('should create an instance', () => {
    const api = itemService({ accessToken, baseUrl, path });

    expect(api).toBeDefined();
  });

  describe('WHEN creating a new item', () => {
    const mockRequest = axios.request as jest.Mock;

    const data = {
      name: 'Lightsaber',
      descirption: `Luke's green lightsaber`
    };

    let api: ItemService;

    beforeEach(() => {
      api = itemService({ accessToken, baseUrl, path });
    });

    test(`should POST with a required 'name' field`, async () => {
      mockRequest.mockResolvedValueOnce({
        data: 'newly-created-id-from-server'
      });

      await api.create(data);

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          baseURL: `${baseUrl}${path}`,
          data: expect.objectContaining(data)
        })
      );
    });

    test.skip(`should return an Item with its 'id' set`, async () => {
      mockRequest.mockResolvedValueOnce({
        data: 'newly-created-id-from-server'
      });

      const item = await api.create(data);

      expect(item).toBeDefined();
      expect(item).toBe('newly-created-id-from-server');
    });
  });
});
