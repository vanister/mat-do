import { produce } from 'immer';
import { CreateAction, CreateState } from './create-types';
import {
  QR_CODE_GENERATION_FAILED,
  QR_CODE_GENERATED,
  QR_CODE_GENERATING,
  INIT,
  CREATE_REQUEST,
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

      case CREATE_REQUEST:
        state.errorMessage = null;
        state.isLoading = true;
        state.created = false;
        state.dataUri = null;
        state.id = null;

        return state;

      case QR_CODE_GENERATING:
        state.isLoading = true;

        return state;

      case QR_CODE_GENERATED:
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
      case QR_CODE_GENERATION_FAILED:
        state.errorMessage = payload.errorMessage;
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
