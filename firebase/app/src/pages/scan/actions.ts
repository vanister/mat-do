import { Dispatch } from 'react';
import { getCurrentLocation } from '../../utilities/geolocation-util';
import { ScanAction, ScanState } from './scan-types';

export const SCAN_INIT = 'SCAN_INIT';
export const SCAN_GET_CURRENT_LOCATION_REQUEST = 'SCAN_GET_CURRENT_LOCATION_REQUEST';
export const SCAN_GET_CURRENT_LOCATION_SUCCESS = 'SCAN_GET_CURRENT_LOCATION_SUCCESS';
export const SCAN_GET_CURRENT_LOCATION_ERROR = 'SCAN_GET_CURRENT_LOCATION_ERROR';
export const SCAN_REMOVE_CURRENT_LCOATION = 'SCAN_REMOVE_CURRENT_LCOATION';
export const SCAN_UPDATING_ITEM = 'SCAN_UPDATING_ITEM';
export const SCAN_UPDATING_ITEM_SUCCESS = 'SCAN_UPDATING_ITEM_SUCCESS';
export const SCAN_UPDATE_ITEM_FAILED = 'SCAN_UPDATE_ITEM_FAILED';

export const removeCurrentLocation = (): ScanAction => ({ type: SCAN_REMOVE_CURRENT_LCOATION });

export const getGeoLocation = () => async (dispatch: Dispatch<ScanAction>) => {
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

export const updateScan =
  (scan: ScanState) => async (dispatch: Dispatch<ScanAction>, getState: () => ScanState) => {};
