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

export function createReducer(
  state: CreateState = null,
  action: CreateAction
): CreateState {
  const { type, payload } = action;

  switch (type) {
    case INIT:
      return { name: '', description: '' };

    case POSTING_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
        created: false,
        dataUri: null,
        id: null
      };

    case GENERATING_QR_CODE:
      return { ...state, isLoading: true };

    case GENERATED_QR_CODE:
      return {
        ...state,
        dataUri: payload.dataUri,
        id: payload.id,
        isLoading: false,
        created: true
      };

    case UPDATE_DESC:
      return { ...state, description: payload.description };

    case UPDATE_NAME:
      return { ...state, name: payload.name };

    case VALIDATION_ERROR:
    case FAILED:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
        created: null,
        id: null,
        dataUri: null
      };

    default:
      return state;
  }
}
