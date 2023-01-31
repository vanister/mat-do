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
  switch (action.type) {
    case CREATE_INIT:
      return { created: false, name: '', description: '' };

    case CREATE_POSTING_REQUEST:
    case CREATE_GENERATING:
    case CREATE_GENERATED:
    case CREATE_UPDATE_DESC:
    case CREATE_UPDATE_NAME:
    case CREATE_FAILED:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
