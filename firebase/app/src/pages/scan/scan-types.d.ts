import { ItemCoordinates, ScannedItem } from '../../models/scan';

export type ScanState = {
  itemId?: string;
  comments?: string;
  coordinateString?: string;
  itemCoordinates?: ItemCoordinates;
  loading: boolean;
  requestingUserLocation: boolean;
  saving?: boolean;
  scannedItem?: ScannedItem;
  useCurrentLocation: boolean;
};

export type ScanPayload = {
  errorMessage: string;
  fieldValue: { name: string; value: string | boolean };
  itemCoordinates: ItemCoordinates;
  itemId: string;
  scannedItem: Partial<ScannedItem>;
  comments: string;
};

export type ScanAction = {
  type: string;
  payload?: Partial<ScanPayload>;
};
