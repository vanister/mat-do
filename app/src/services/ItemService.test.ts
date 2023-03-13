import { describe, expect, test, beforeEach } from '@jest/globals';
import { AxiosStatic } from 'axios';
import { ItemService } from './ItemService';

describe('ItemService', () => {
  const baseUrl = 'unittest.matdo.com/api';
  const accessToken = 'some.base64encoded.string';

  test('should create an instance', () => {
    const service = new ItemService({} as AxiosStatic, baseUrl, accessToken);

    expect(service).toBeDefined();
  });

  describe('WHEN creating a new item', () => {
    const mockAxios: Partial<AxiosStatic> = {
      post: jest.fn(),
      request: jest.fn()
    };

    const data = {
      name: 'Lightsaber',
      descirption: `Luke's green lightsaber`
    };

    let service: ItemService;

    beforeEach(() => {
      service = new ItemService(mockAxios as AxiosStatic, baseUrl, accessToken);
    });

    test(`should POST with a required 'name' field`, async () => {
      await service.create(data);

      expect(mockAxios.post).toHaveBeenCalledWith(
        baseUrl,
        expect.objectContaining({ name: 'Lightsaber' })
      );
    });

    test(`should return an Item with its 'id' set`, async () => {
      (mockAxios.post as jest.Mock).mockResolvedValueOnce('an-item-id-uuid');

      const item = await service.create(data);

      expect(item).toBeDefined();
    });
  });
});
