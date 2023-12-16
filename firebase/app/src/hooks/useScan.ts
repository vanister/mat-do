import { useState } from 'react';
import { ScannedItem } from '../models/scan';
import { sendRequest } from '../utilities/api';

export function useScan() {
  const [saving, setSaving] = useState(false);

  async function updateItem(item: Partial<ScannedItem>) {
    setSaving(true);

    await sendRequest<void>('/scan', {
      method: 'POST',
      data: item
    });

    setSaving(false);
  }

  return { saving, updateItem };
}
