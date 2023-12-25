import { produce } from 'immer';
import { ScanAction, ScanState } from './scan-types';

export function scanReducer(baseState: ScanState, action: ScanAction) {
  const { type, payload } = action;

  return produce(baseState, (draft) => {});
}
