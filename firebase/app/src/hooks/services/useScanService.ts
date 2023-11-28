import { ScannedItem } from '../../models/scan';
import { sendRequest } from '../../utilities/api';

/** @deprecated - replace with custom hooks */
export interface ScanService {
  /** @deprecated - replace with custom hooks */
  scan(scan: Partial<ScannedItem>): Promise<void>;
  /** @deprecated - replace with custom hooks */
  getByItemId(itemId: string): Promise<ScannedItem[]>;
}

/** @deprecated - replace with custom hooks */

export function useScanService(): ScanService {
  const path = '/scan';

  /** @deprecated  */
  async function scan(scan: Partial<ScannedItem>): Promise<void> {
    await sendRequest<void>(path, {
      method: 'POST',
      data: scan
    });
  }

  /** @deprecated  */
  async function getByItemId(itemId: string): Promise<ScannedItem[]> {
    const { data } = await sendRequest<ScannedItem[]>(path, {
      params: { itemId }
    });

    return data;
  }

  return { scan, getByItemId };
}
