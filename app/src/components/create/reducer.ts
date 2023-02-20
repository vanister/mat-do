import { CreateAction, CreateState } from './create-types';
import {
  CREATE_FAILED,
  CREATE_GENERATED,
  CREATE_GENERATING,
  CREATE_INIT,
  CREATE_POSTING_REQUEST,
  CREATE_UPDATE_DESC,
  CREATE_UPDATE_NAME
} from './actions';

export function createReducer(
  state: CreateState = null,
  action: CreateAction
): CreateState {
  const { type, payload } = action;

  switch (type) {
    case CREATE_INIT:
      return { created: false, name: '', description: '' };

    case CREATE_POSTING_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        created: false,
        dataUri: null,
        id: null
      };

    case CREATE_GENERATING:
      return { ...state, loading: true };

    case CREATE_GENERATED:
      return {
        ...state,
        dataUri: payload.dataUri,
        id: payload.id,
        loading: false,
        created: true
      };

    case CREATE_UPDATE_DESC:
      return { ...state, description: payload.description };

    case CREATE_UPDATE_NAME:
      return { ...state, name: payload.name };

    case CREATE_FAILED:
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
