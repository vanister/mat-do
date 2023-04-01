import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from '../models/item';
import { getScanItemInfo } from '../utilities/item-util';

export function useScannedInfo() {
  const { hash } = useLocation();

  const item = useMemo<Partial<Item>>(() => {
    try {
      const converted = getScanItemInfo(hash);

      return converted;
    } catch (error) {
      console.warn('Failed to get the item info from the hash fragment');
      return null;
    }
  }, [hash]);

  return item;
}
