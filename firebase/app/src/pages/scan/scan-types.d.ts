export type ScanState = {
  useCurrentLocation: boolean;
  fetchingCoords: boolean;
  comments: string;
  itemCoordinates?: ItemCoordinates;
};

export type ScanPayload = {
  itemCoordinates: ItemCoordinates;
  fieldValue: { name: string; value: string | boolean };
  errorMessage: string;
};

export type ScanAction = {
  type: string;
  payload?: Partial<ScanPayload>;
};
