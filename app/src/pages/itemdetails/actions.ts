import { Item } from '../../models/item';
import { sendRequestWithAuth } from '../../utilities/api';
import { ItemDetailAction, ItemDetailDispatch } from './itemdetails-types';

export const ITEM_DETAILS_FAILED = 'ITEM_DETAILS_FAILED';
export const ITEM_DETAILS_REQUEST = 'ITEM_DETAIL_REQUEST';
export const ITEM_DETAILS_SUCCESS = 'ITEM_DETAIL_SUCCESS';
export const TOGGLE_FOUND = 'ITEM_DETAILS_TOGGLE_FOUND';
export const UPDATE_DESCRIPTION = 'ITEM_DETAILS_UPDATE_DESCRIPTION';
export const UPDATE_ITEM_FAILED = 'UPDATE_ITEM_FAILED';
export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_NAME = 'ITEM_DETAILS_UPDATE_NAME';

const ITEM_PATH = '/items';

export const updateName = (name: string): ItemDetailAction => ({
  type: UPDATE_NAME,
  payload: { name }
});

export const updateDescription = (description: string): ItemDetailAction => ({
  type: UPDATE_DESCRIPTION,
  payload: { description }
});

export const toggleFound = (found: boolean): ItemDetailAction => ({
  type: TOGGLE_FOUND,
  payload: { found }
});

export const getItemDetails =
  (id: string, accessToken: string) => async (dispatch: ItemDetailDispatch) => {
    dispatch({ type: ITEM_DETAILS_REQUEST });

    try {
      const { data } = await sendRequestWithAuth<Item>(`${ITEM_PATH}/${id}`, accessToken);

      dispatch({
        type: ITEM_DETAILS_SUCCESS,
        payload: { item: data }
      });
    } catch (error) {
      dispatch({
        type: ITEM_DETAILS_FAILED,
        payload: { errorMessage: error.message || 'Error fetching item details' }
      });
    }
  };

export const updateItem =
  (item: Partial<Item>, accessToken: string) => async (dispatch: ItemDetailDispatch) => {
    dispatch({ type: UPDATE_ITEM_REQUEST });

    // todo - validate the item

    try {
      await sendRequestWithAuth(ITEM_PATH, accessToken, { method: 'PUT', data: item });

      dispatch({ type: UPDATE_ITEM_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_ITEM_FAILED, payload: { errorMessage: error.message } });
    }
  };
