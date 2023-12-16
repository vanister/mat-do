import { produce } from 'immer';
import { DASHBOARD_LOAD_FAILED, DASHBOARD_LOAD_REQUEST, DASHBOARD_LOAD_SUCCESS } from './actions';
import { DashboardAction, DashboardState } from './dashboard-types';

export function dashboardReducer(
  baseState: DashboardState,
  action: DashboardAction
): DashboardState {
  const { type, payload } = action;

  return produce(baseState, (state: DashboardState) => {
    switch (type) {
      case DASHBOARD_LOAD_REQUEST:
        state.loading = true;

        return state;

      case DASHBOARD_LOAD_SUCCESS:
        state.items = payload.items;
        state.loading = false;
        state.error = null;

        return state;

      case DASHBOARD_LOAD_FAILED:
        state.items = [];
        state.loading = false;
        state.error = payload.error;

        return state;

      default:
        return state;
    }
  });
}
