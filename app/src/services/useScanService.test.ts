import { describe, expect, test, beforeEach } from '@jest/globals';
import { ScanService, useScanService } from './useScanService';
import { useServiceDeps } from './useServiceDependencies';
import { sendRequest } from '../utilities/api';

jest.mock('./useServiceDependencies', () => ({
  useServiceDeps: jest.fn()
}));

jest.mock('../../utilities/api', () => ({
  sendRequest: jest.fn()
}));

describe('useScanService.test', () => {
  const mockUseServiceDeps = useServiceDeps as jest.Mock;
  const mockSendRequest = sendRequest as jest.Mock;

  let service: ScanService;

  beforeEach(() => {
    mockUseServiceDeps.mockReturnValue({
      accessToken: 'somebase64encodedtoken',
      baseUrl: 'http://localhost:3000/unittest'
    });
  });

  beforeEach(() => {
    service = useScanService();
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
