import { DASHBOARD_LOAD_FAILED, DASHBOARD_LOAD_REQUEST, DASHBOARD_LOAD_SUCCESS } from './actions';
import { DashboardAction, DashboardState } from './dashboard-types';

export function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  const { type, payload } = action;

  switch (type) {
    case DASHBOARD_LOAD_REQUEST:
      return { ...state, loading: true };

    case DASHBOARD_LOAD_SUCCESS:
      return { ...state, items: payload.items, loading: false, error: null };

    case DASHBOARD_LOAD_FAILED:
      return { ...this.state, items: [], loading: false, error: payload.error };

    default:
      return state;
  }
}
