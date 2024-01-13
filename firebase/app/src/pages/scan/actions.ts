import { getCurrentLocation } from '../../utilities/geolocation-util';
import { ScanAction, ScanDispatch } from './scan-types';
import { ScannedItem } from '../../models/scan';
import { sendRequest } from '../../utilities/api';
import { Timestamp } from 'firebase/firestore';
import { getScanItemInfo } from '../../utilities/item-util';

export const SCAN_GET_CURRENT_LOCATION_ERROR = 'SCAN_GET_CURRENT_LOCATION_ERROR';
export const SCAN_GET_CURRENT_LOCATION_REQUEST = 'SCAN_GET_CURRENT_LOCATION_REQUEST';
export const SCAN_GET_CURRENT_LOCATION_SUCCESS = 'SCAN_GET_CURRENT_LOCATION_SUCCESS';
export const SCAN_SCANNED_INFO_SUCCESS = 'SCAN_SCANNED_INFO_SUCCESS';
export const SCAN_SCANNED_INFO_FAILED = 'SCAN_SCANNED_INFO_FAILEDs';
export const SCAN_INIT = 'SCAN_INIT';
export const SCAN_REMOVE_CURRENT_LCOATION = 'SCAN_REMOVE_CURRENT_LCOATION';
export const SCAN_UPDATE_COMMENTS = 'SCAN_UPDATE_COMMENTS';
export const SCAN_UPDATE_FAILED = 'SCAN_UPDATE_ITEM_FAILED';
export const SCAN_UPDATE_REQUEST = 'SCAN_UPDATING_ITEM';
export const SCAN_UPDATE_SUCCESS = 'SCAN_UPDATING_ITEM_SUCCESS';

const SCAN_ENDPOINT = '/scan';

export const updateComments = (comments: string): ScanAction => ({
  type: SCAN_UPDATE_COMMENTS,
  payload: { comments }
});

export const removeCurrentLocation = (): ScanAction => ({ type: SCAN_REMOVE_CURRENT_LCOATION });

export const initScan = (itemId: string, hash?: string) => (dispatch: ScanDispatch) => {
  dispatch({ type: SCAN_INIT, payload: { itemId } });

  try {
    const scannedItem = getScanItemInfo(hash);

    dispatch({ type: SCAN_SCANNED_INFO_SUCCESS, payload: { scannedItem } });
  } catch (error) {
    console.warn('Failed to get the item info from the hash fragment');

    dispatch({
      type: SCAN_SCANNED_INFO_FAILED,
      payload: { errorMessage: 'Error reading the scanned item' }
    });
  }
};

export const getUserLocation = (toggled: boolean) => async (dispatch: ScanDispatch) => {
  if (!toggled) {
    dispatch(removeCurrentLocation());
    return;
  }

  try {
    dispatch({ type: SCAN_GET_CURRENT_LOCATION_REQUEST });

    const coords = await getCurrentLocation(navigator.geolocation);

    dispatch({
      type: SCAN_GET_CURRENT_LOCATION_SUCCESS,
      payload: { itemCoordinates: coords }
    });
  } catch (error) {
    dispatch({
      type: SCAN_GET_CURRENT_LOCATION_ERROR,
      payload: { errorMessage: error.message }
    });
  }
};

export const updateScan = (scannedItem: Partial<ScannedItem>) => async (dispatch: ScanDispatch) => {
  const timestampedScannedItem: Partial<ScannedItem> = {
    ...scannedItem,
    scannedAt: Timestamp.now()
  };

  // todo - validate scanned item

  try {
    dispatch({ type: SCAN_UPDATE_REQUEST });

    await sendRequest(SCAN_ENDPOINT, { method: 'POST', data: timestampedScannedItem });

    dispatch({ type: SCAN_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: SCAN_UPDATE_FAILED, payload: { errorMessage: error.message } });
  }
};
