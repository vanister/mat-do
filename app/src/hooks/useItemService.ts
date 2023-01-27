import axios from 'axios';
import { useMemo } from 'react';
import { ItemService } from '../services/ItemService';

export function useItemService() {
  const service = useMemo(() => new ItemService(axios), []);

  return service;
}
