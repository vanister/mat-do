import { ScannedItem } from '../../models/scan';
import { sendRequest } from '../../utilities/api';

export interface ScanService {
  scan(scan: Partial<ScannedItem>): Promise<void>;
  getByItemId(itemId: string): Promise<ScannedItem[]>;
}

export function useScanService(): ScanService {
  const path = '/scan';

  async function scan(scan: Partial<ScannedItem>): Promise<void> {
    await sendRequest<void>(path, {
      method: 'POST',
      data: scan
    });
  }

  async function getByItemId(itemId: string): Promise<ScannedItem[]> {
    const { data } = await sendRequest<ScannedItem[]>(path, {
      params: { itemId }
    });

    return data;
  }

  return { scan, getByItemId };
}
