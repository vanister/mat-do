import { produce } from 'immer';
import { CreateAction, CreateState } from './create-types';
import {
  CREATE_QR_CODE_GENERATION_FAILED,
  CREATE_QR_CODE_GENERATED,
  CREATE_QR_CODE_GENERATING,
  CREATE_INIT,
  CREATE_UPDATE_DESC,
  CREATE_UPDATE_NAME,
  CREATE_VALIDATION_ERROR
} from './actions';

export const INITIAL_CREATE_STATE: CreateState = {
  name: '',
  description: ''
};

export function createReducer(baseState: CreateState, action: CreateAction): CreateState {
  const { type, payload } = action;

  return produce(baseState, (state: CreateState) => {
    switch (type) {
      case CREATE_INIT:
        return { name: '', description: '' };

      case CREATE_QR_CODE_GENERATING:
        state.isLoading = true;
        state.created = false;
        delete state.dataUri;
        delete state.errorMessage;
        delete state.id;

        return state;

      case CREATE_QR_CODE_GENERATED:
        state.dataUri = payload.dataUri;
        state.id = payload.id;
        state.isLoading = false;
        state.created = true;

        return state;

      case CREATE_UPDATE_DESC:
        state.description = payload.description;

        return state;

      case CREATE_UPDATE_NAME:
        state.name = payload.name;

        return state;

      case CREATE_VALIDATION_ERROR:
      case CREATE_QR_CODE_GENERATION_FAILED:
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
