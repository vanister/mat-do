import { describe, expect, test, beforeEach } from '@jest/globals';
import { BaseError } from './base.error';
import { handleError } from './handler';
import { Response } from 'express';

describe('Error Handler', () => {
  class TestBaseError extends BaseError {
    constructor(message = 'test base error') {
      super('TestBaseError', message);
    }
  }

  const mockConsole = { log: jest.fn() };

  const mockSend = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
  const mockResponse: Partial<Response> = {
    status: mockStatus,
    sendStatus: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send a 400 Bad Request for BaseErrors', () => {
    const error = new TestBaseError();

    handleError(error, mockResponse as Response, mockConsole);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockSend).toHaveBeenCalledWith(error.message);
    expect(mockResponse.sendStatus).not.toHaveBeenCalled();
  });

  test('should send a 500 Internal server error for non BaseErrors', () => {
    const error = new Error('internal server error');

    handleError(error, mockResponse as Response, mockConsole);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});
