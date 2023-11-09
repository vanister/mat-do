import './Dashboard.scss';

import React, { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from 'reactfire';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';
import { useThunkReducer } from '../../hooks/useThunkReducer';
import { dashboardReducer } from './reducer';
import { DashboardState, FilterParams } from './dashboard-types';
import { load } from './actions';

const initialState: DashboardState = {
  items: [],
  loading: false
};

export default function Dashboard() {
  const { size } = useParams<FilterParams>();
  const pageSize = parseInt(size) || 10;
  const { showBoundary } = useErrorBoundary();
  const { data: user } = useUser();
  const [state, dispatch] = useThunkReducer(dashboardReducer, initialState);
  const { loading, error, items } = state;

  useEffect(() => {
    dispatch(load(user, pageSize));
  }, [dispatch, pageSize, user]);

  if (error) {
    showBoundary(error);

    return null;
  }

  return (
    <div className="dashboard-page">
      <Title>Dashboard</Title>
      <div className="list-container">
        {loading ? (
          <Loading />
        ) : (
          <div className="item-list">
            {items?.map(({ id, name, description }) => (
              <div key={id} className="item">
                <p className="item-name">
                  <NavLink to={`/item/${id}`}>{name}</NavLink>
                </p>
                <p className="item-desc">{description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
