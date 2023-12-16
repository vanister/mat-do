import { produce } from 'immer';
import { CreateAction, CreateState } from './create-types';
import {
  FAILED,
  GENERATED_QR_CODE,
  GENERATING_QR_CODE,
  INIT,
  POSTING_REQUEST,
  UPDATE_DESC,
  UPDATE_NAME,
  VALIDATION_ERROR
} from './actions';

export function createReducer(baseState: CreateState, action: CreateAction): CreateState {
  const { type, payload } = action;

  return produce(baseState, (state: CreateState) => {
    switch (type) {
      case INIT:
        return { name: '', description: '' };

      case POSTING_REQUEST:
        state.error = null;
        state.isLoading = true;
        state.created = false;
        state.dataUri = null;
        state.id = null;

        return state;

      case GENERATING_QR_CODE:
        state.isLoading = true;

        return state;

      case GENERATED_QR_CODE:
        state.dataUri = payload.dataUri;
        state.id = payload.id;
        state.isLoading = false;
        state.created = true;

        return state;

      case UPDATE_DESC:
        state.description = payload.description;

        return state;

      case UPDATE_NAME:
        state.name = payload.name;

        return state;

      case VALIDATION_ERROR:
      case FAILED:
        state.error = payload.errorMsg;
        state.isLoading = false;
        state.created = null;
        state.id = null;
        state.dataUri = null;

        return state;

      default:
        return state;
    }
  });
}
