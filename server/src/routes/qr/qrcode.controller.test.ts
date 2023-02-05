import { describe, expect, test, beforeEach } from '@jest/globals';
import { Item } from '../../models/item';
import { PostDependencies } from './qr-types';
import { list, post } from './qrcode.controller';

describe('QrCodeController', () => {
  const testId = 'some-generic-item-id-uuid';
  const deps: PostDependencies = {
    uuid: jest.fn().mockReturnValue(testId),
    logger: jest.fn(),
  };

  const response = {
    status: jest.fn(),
    send: jest.fn(),
    sendStatus: jest.fn(),
  };

  describe('WHEN posting', () => {
    const item: Item = {
      name: 'Lightsaber',
      description: 'Green lightsaber',
      userId: 'user-1',
      createdAt: new Date('2023-02-01'),
    };

    const request = { body: item };

    let action: (req: any, res: any) => Promise<void>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      action = post(deps);
    });

    test('should validate request body', async () => {
      const badRequest = { body: { description: 'missing name' } };

      await action(badRequest, response);

      expect(response.sendStatus).toHaveBeenCalledWith(400);
    });

    test('should accept an Item in the body of the request', async () => {
      await action(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(testId);
    });
  });

  describe('WHEN getting a list of items', () => {
    const request = { params: { userId: 'rey-skywalker-lightsaber' } };
    const action: (req: any, res: any) => Promise<void> = list();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return 400 if missing userId', async () => {
      const request = { params: { userId: null } };

      await action(request, response);

      expect(response.sendStatus).toHaveBeenCalledWith(400);
    });

    test('should return 404 if no items are found', async () => {
      const request = { params: { userId: 'not-found-user-id' } };

      await action(request, response);

      expect(response.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});
