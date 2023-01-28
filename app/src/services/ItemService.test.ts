import { AxiosStatic } from 'axios';
import { ItemService } from './ItemService';

describe('ItemService', () => {
  const baseUrl = 'unittest.matdo.com/api';

  test('should create an instance', () => {
    const service = new ItemService({} as AxiosStatic, baseUrl);

    expect(service).toBeDefined();
  });

  describe('WHEN creating a new item', () => {
    const mockAxios: Partial<AxiosStatic> = {
      post: jest.fn()
    };

    let service: ItemService;

    beforeEach(() => {
      service = new ItemService(mockAxios as AxiosStatic, baseUrl);
    });

    test(`should POST with a required 'name' field`, async () => {
      const data = {
        name: 'Lightsaber',
        descirption: `Luke's green lightsaber`
      };

      const item = await service.post(data);

      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Lightsaber' })
      );
    });
  });
});
