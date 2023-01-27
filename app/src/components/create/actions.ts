import { Dispatch } from 'react';
import { CreateAction } from './reducer';

export type CreateDispatch = Dispatch<CreateAction>;

export const CREATE_INIT = 'CREATE_INIT';
export const CREATE_GENERATING = 'CREATE_GENERATING';
export const CREATE_GENERATED = 'CREATE_GENERATED';
export const CREATE_FAILED = 'CREATE_FAILED';
export const CREATE_UPDATE_NAME = 'CREATE_UPDATE_NAME';
export const CREATE_UPDATE_DESC = 'CREATE_UPDATE_DESC';

export function init(dispatch: CreateDispatch) {
  return dispatch({ type: CREATE_INIT });
}

export function generate(dispatch: CreateDispatch) {
  return function (dataUri: string = null) {
    if (!dataUri) {
      dispatch({
        type: CREATE_GENERATING,
        payload: { created: false, dataUri: null }
      });
      return;
    }

    dispatch({
      type: CREATE_GENERATED,
      payload: { created: true, dataUri }
    });
  };
}

export function failed(dispatch: CreateDispatch) {
  return function (error: string) {
    dispatch({ type: CREATE_FAILED, payload: { error } });
  };
}

export function updateName(dispatch: CreateDispatch) {
  return function (name: string) {
    dispatch({ type: CREATE_UPDATE_NAME, payload: { name } });
  };
}

export function updateDesc(dispatch: CreateDispatch) {
  return function (desc: string) {
    dispatch({ type: CREATE_UPDATE_DESC, payload: { desc } });
  };
}
