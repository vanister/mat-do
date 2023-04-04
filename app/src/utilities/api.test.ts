import { describe, expect, test, beforeEach } from '@jest/globals';
import axios from 'axios';
import { sendRequest } from './api';

jest.mock('axios', () => ({
  request: jest.fn()
}));

describe('API Utility', () => {
  const mockAxiosRequest = axios.request as jest.Mock;
  const accessToken = 'base64encodedaccesstoken';
  const baseUrl = 'http://localhost:3000/unittest';

  beforeEach(() => {
    mockAxiosRequest.mockClear();
  });

  test('should send a request with default matdo required headers', async () => {
    const expectedHeaders = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    };

    await sendRequest('/unittest', accessToken);

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expectedHeaders })
    );
  });

  test('should send a request with search params', async () => {
    const params = {
      id: 1,
      itemId: 'item-guid-string'
    };

    await sendRequest('/unittest/params', accessToken, { params });

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ params })
    );
  });

  describe('WHEN sending requests with default values', () => {
    const originalEnvs = { ...process.env };

    beforeEach(() => {
      process.env = { REACT_APP_API_BASE_URL: `${baseUrl}/defaults` } as any;
    });

    afterEach(() => {
      process.env = originalEnvs;
    });

    test('should default to GET method', async () => {
      await sendRequest('/default/method', accessToken);

      expect(mockAxiosRequest).toHaveBeenCalledWith(
        expect.objectContaining({ method: 'GET' })
      );
    });

    test('should default to process.env.REACT_APP_API_BASE_URL for baseUrl', async () => {
      await sendRequest('/unittest/env', accessToken);

      expect(mockAxiosRequest).toHaveBeenCalledWith(
        expect.objectContaining({ baseURL: `${baseUrl}/defaults` })
      );
    });
  });
});
