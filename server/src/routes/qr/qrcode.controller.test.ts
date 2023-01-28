import { describe, expect, test, beforeEach } from '@jest/globals';
import { Item, PostDependencies } from './qr-types';
import { post } from './qrcode.controller';

describe('QrCodeController', () => {
  const testId = 'some-generic-item-id-uuid';
  const deps: PostDependencies = {
    uuid: jest.fn().mockReturnValue(testId),
    logger: jest.fn(),
  };

  describe('WHEN posting', () => {
    const item: Item = {
      name: 'Lightsaber',
      description: 'Green lightsaber',
    };

    const request = { body: item };

    const response = {
      status: jest.fn(),
      send: jest.fn(),
      sendStatus: jest.fn(),
    };

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
});
