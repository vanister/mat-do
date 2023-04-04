import { describe, expect, test, beforeEach } from '@jest/globals';
import axios from 'axios';
import { sendRequest } from './api';

jest.mock('axios', () => ({
  request: jest.fn()
}));

describe('API Utility', () => {
  const mockAxiosRequest = axios.request as jest.Mock;
  const accessToken = 'base64encodedaccesstoken';

  beforeEach(() => {
    mockAxiosRequest.mockClear();
  });

  test('should send a request with default matdo required headers', async () => {
    const expectedHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    };

    await sendRequest({
      url: '/unittest',
      accessToken
    });

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expectedHeaders })
    );
  });

  test('should send a request with search params', async () => {
    const params = {
      id: 1,
      itemId: 'item-guid-string'
    };

    await sendRequest({ url: '/unittest/params', accessToken, params });

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ params })
    );
  });
});
