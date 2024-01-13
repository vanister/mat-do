import { Item } from '../../models/item';

export type ItemDetailState = {
  name: string;
  description: string;
  found: boolean;
  item?: Item;
  scanned?: number;
  lastScanned?: string;
  loading?: boolean;
  saving?: boolean;
  errorMessage?: string;
};

export type ItemDetailAction = {
  type: string;
  payload?: Partial<ItemDetailPayload>;
};

export type ItemDetailPayload = {
  name: string;
  description: string;
  found: boolean;
  item: Item;
  errorMessage: string;
};

export type ItemDetailDispatch = Dispatch<ItemDetailAction>;
