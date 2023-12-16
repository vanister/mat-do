import { ItemCoordinates } from '../../models/scan';

export const SCAN_READ_HASH = 'SCAN_READ_HASH';
export const SCAN_GET_CURRENT_LOCATION_REQUEST = 'SCAN_GET_CURRENT_LOCATION_REQUEST';
export const SCAN_GET_CURRENT_LOCATION_SUCCESS = 'SCAN_GET_CURRENT_LOCATION_SUCCESS';
export const SCAN_GET_CURRENT_LOCATION_ERROR = 'SCAN_GET_CURRENT_LOCATION_ERROR';
export const SCAN_REMOVE_CURRENT_LCOATION = 'SCAN_REMOVE_CURRENT_LCOATION';
export const SCAN_UPDATING_ITEM = 'SCAN_UPDATING_ITEM';
export const SCAN_UPDATE_ITEM_FAILED = 'SCAN_UPDATE_ITEM_FAILED';

export type ScanPayload = {
  fetchingCoords: boolean;
  itemCoordinates: ItemCoordinates;
  useCurrentLocation: boolean;
};

export type ScanAction = {
  type: string;
  payload?: Partial<ScanPayload>;
};

export function getLocation() {
  return async function (dispatch: React.Dispatch<ScanAction>) {
    dispatch({ type: SCAN_GET_CURRENT_LOCATION_REQUEST });
  };
}

export function removeCurrentLocation(): ScanAction {
  return { type: SCAN_REMOVE_CURRENT_LCOATION };
}
