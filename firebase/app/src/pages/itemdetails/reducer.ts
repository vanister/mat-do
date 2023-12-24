import { produce } from 'immer';
import {
  UPDATE_NAME,
  UPDATE_DESCRIPTION,
  TOGGLE_FOUND,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE
} from './actions';
import { ItemDetailState, ItemDetailAction } from './itemdetails-types';

export const itemDetailReducer = (baseState: ItemDetailState, action: ItemDetailAction) => {
  const { type, payload } = action;

  return produce(baseState, (draft) => {
    switch (type) {
      case ITEM_DETAILS_REQUEST:
        draft.loading = true;
        draft.errorMessage = null;
        break;

      case ITEM_DETAILS_SUCCESS:
        draft.loading = false;
        draft.item = payload.item;
        break;

      case ITEM_DETAILS_FAILURE:
        draft.loading = false;
        draft.errorMessage = payload.errorMessage;
        break;

      case UPDATE_NAME:
        draft.name = payload.name;
        break;

      case UPDATE_DESCRIPTION:
        draft.description = payload.description;
        break;

      case TOGGLE_FOUND:
        draft.found = payload.found;
        break;

      default:
        break;
    }
  });
};
