import { describe, expect, test } from '@jest/globals';
import { createReducer } from './reducer';
import { CreateState } from './create-types';
import { CREATE_INIT, CREATE_REQUEST, CREATE_REQUEST_SUCCESS } from './actions';

describe('Create Page Reducer', () => {
  const initialState: CreateState = {
    description: '',
    name: ''
  };

  describe('WHEN initializing', () => {
    test('should return empty values for name and description', () => {
      const newState = createReducer(initialState, { type: CREATE_INIT });

      expect(newState).toEqual({ name: '', description: '' });
    });
  });

  describe('WHEN making create requests', () => {
    test('should set request state', () => {
      const expectedState = {
        ...initialState,
        isLoading: true,
        created: false
      };

      const newState = createReducer(initialState, { type: CREATE_REQUEST });

      expect(newState).toEqual(expectedState);
    });

    test('should set successful state', () => {
      const dataUri = 'data:image/png;base64,aBase64EncodedItem';
      const id = 'a-unique-item-id';

      const expectedState = {
        ...initialState,
        isLoading: false,
        created: true,
        dataUri,
        id
      };

      const newState = createReducer(initialState, {
        type: CREATE_REQUEST_SUCCESS,
        payload: { dataUri, id }
      });

      expect(newState).toEqual(expectedState);
    });
  });
});
