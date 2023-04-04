import { ScannedItem } from '../../models/scan';
import { sendRequest } from '../../utilities/api';
import { useServiceDeps } from './useServiceDependencies';

export interface ScanService {
  sendScan(scan: ScannedItem): Promise<void>;
  getByItemId(itemId: string): Promise<ScannedItem[]>;
}

export function useScanService(): ScanService {
  const { accessToken } = useServiceDeps();

  async function sendScan(scan: ScannedItem): Promise<void> {
    await sendRequest<void>({
      url: '/scan',
      method: 'POST',
      data: scan,
      accessToken
    });
  }

  async function getByItemId(itemId: string): Promise<ScannedItem[]> {
    const { data } = await sendRequest<ScannedItem[]>({
      url: '/scan',
      accessToken
    });

    return data;
  }

  return { sendScan, getByItemId };
}
