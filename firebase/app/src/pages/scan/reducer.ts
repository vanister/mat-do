import { produce } from 'immer';
import { ScanAction, ScanState } from './scan-types';

export const INITIAL_STATE: ScanState = {
  useCurrentLocation: false,
  requestingUserLocation: false,
  coordinateString: '',
  comments: '',
  loading: false
};

export function scanReducer(baseState: ScanState, action: ScanAction) {
  const { type, payload } = action;

  return produce(baseState, (draft) => {});
}
