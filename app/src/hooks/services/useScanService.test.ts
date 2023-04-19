import { describe, expect, test, beforeEach } from '@jest/globals';
import { ScanService, useScanService } from './useScanService';

jest.mock('./useServiceDependencies', () => ({
  useServiceDeps: jest.fn()
}));

jest.mock('../../utilities/api', () => ({
  sendRequest: jest.fn()
}));

describe('useScanService.test', () => {
  let service: ScanService;

  beforeEach(() => {
    service = useScanService();
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
