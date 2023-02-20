import { CreateAction, CreateState } from './create-types';
import {
  FAILED,
  GENERATED,
  GENERATING,
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
        loading: true,
        created: false,
        dataUri: null,
        id: null
      };

    case GENERATING:
      return { ...state, loading: true };

    case GENERATED:
      return {
        ...state,
        dataUri: payload.dataUri,
        id: payload.id,
        loading: false,
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
        loading: false,
        created: null,
        id: null,
        dataUri: null
      };

    default:
      return state;
  }
}
