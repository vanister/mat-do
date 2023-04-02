import { ScannedItem } from '../../models/item';
import { sendRequest } from '../../utilities/api';
import { useServiceDeps } from '../useServiceDependencies';

export interface ScanService {
  sendScan(itemId: string, scan: ScannedItem): Promise<void>;
}

export function useScanService(): ScanService {
  const { accessToken, baseUrl } = useServiceDeps();

  async function sendScan(itemId: string, scan: ScannedItem): Promise<void> {
    await sendRequest<void>({
      url: '/scan',
      method: 'PUT',
      data: scan,
      accessToken,
      baseUrl
    });
  }

  return { sendScan };
}
