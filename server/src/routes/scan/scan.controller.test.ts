import { Request, Response } from 'express';
import { ScanData } from './scan-types';
import { post } from './scan.controller';

describe('Scan Controller', () => {
  describe('WHEN posting', () => {
    const body: ScanData = {
      itemId: 'ceaa5ad8-3010-42ff-9b12-50c5b6b573e9',
      description: 'Scanned from a unit test',
    };

    const mockRequest: Partial<Request> = { body };
    const mockResponse: Partial<Response> = {
      status: jest.fn(),
      send: jest.fn(),
      sendStatus: jest.fn(),
    };

    const mockUuid = {
      validate: jest.fn().mockReturnValue(true),
    };

    let action: (req: Request, res: Response) => void;

    beforeEach(() => {
      action = post({ validate: mockUuid.validate });
      jest.clearAllMocks();
    });

    test('should respond with a 204 status code', () => {
      action(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should respond with a 400 when scan data is missing', () => {
      const request = {};
      mockUuid.validate.mockReturnValueOnce(false);

      action(request as Request, mockResponse as Response);

      expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });

    test('should respond with a 400 when itemId is bad', () => {
      const request = { body: { itemId: 'bad-item-uuid' } };

      action(request as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith('Bad item id');
    });
  });
});
