import { describe, expect, test, beforeEach, afterEach, vi, type Mock } from 'vitest';
import axios from 'axios';
import { sendRequestWithAuth } from './api';

vi.mock('axios', () => ({
  default: { request: vi.fn() }
}));

describe('API Utility', () => {
  const mockAxiosRequest = axios.request as Mock;
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

    await sendRequestWithAuth('/unittest', accessToken);

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ headers: expectedHeaders })
    );
  });

  test('should send a request with search params', async () => {
    const params = {
      id: 1,
      itemId: 'item-guid-string'
    };

    await sendRequestWithAuth('/unittest/params', accessToken, { params });

    expect(mockAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ params })
    );
  });

  describe('WHEN sending requests with default values', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_API_BASE_URL', `${baseUrl}/defaults`);
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    test('should default to GET method', async () => {
      await sendRequestWithAuth('/default/method', accessToken);

      expect(mockAxiosRequest).toHaveBeenCalledWith(
        expect.objectContaining({ method: 'GET' })
      );
    });

    test('should default to import.meta.env.VITE_API_BASE_URL for baseUrl', async () => {
      await sendRequestWithAuth('/unittest/env', accessToken);

      expect(mockAxiosRequest).toHaveBeenCalledWith(
        expect.objectContaining({ baseURL: `${baseUrl}/defaults` })
      );
    });
  });
});
