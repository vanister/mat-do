import { ScannedItem } from '../../models/scan';
import { sendRequest } from '../../utilities/api';
import { useServiceDeps } from './useServiceDependencies';

export interface ScanService {
  scan(scan: ScannedItem): Promise<void>;
  getByItemId(itemId: string): Promise<ScannedItem[]>;
}

export function useScanService(): ScanService {
  const { accessToken } = useServiceDeps();

  async function scan(scan: ScannedItem): Promise<void> {
    await sendRequest<void>('/scan', accessToken, {
      method: 'POST',
      data: scan
    });
  }

  async function getByItemId(itemId: string): Promise<ScannedItem[]> {
    const { data } = await sendRequest<ScannedItem[]>('/scan', accessToken, {
      params: { itemId }
    });

    return data;
  }

  return { scan, getByItemId };
}
