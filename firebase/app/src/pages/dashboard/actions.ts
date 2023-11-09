import { User } from 'firebase/auth';
import { sendRequestWithAuth } from '../../utilities/api';
import { Item } from '../../models/item';
import { DashboardAction } from './dashboard-types';

export const DASHBOARD_LOAD_REQUEST = 'DASHBOARD_LOAD_REQUEST';
export const DASHBOARD_LOAD_SUCCESS = 'DASHBOARD_LOAD_SUCCESS';
export const DASHBOARD_LOAD_FAILED = 'DASHBOARD_LOAD_FAILED';

export function load(user: User, size = 10) {
  return async function (dispatch: React.Dispatch<DashboardAction>) {
    dispatch({ type: DASHBOARD_LOAD_REQUEST });

    try {
      const token = await user.getIdToken();
      const response = await sendRequestWithAuth<Item[]>(`/items/list`, token);

      dispatch({ type: DASHBOARD_LOAD_SUCCESS, payload: { items: response.data } });
    } catch (error) {
      dispatch({ type: DASHBOARD_LOAD_FAILED, payload: { error: error } });
    }
  };
}
