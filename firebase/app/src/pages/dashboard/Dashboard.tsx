import './Dashboard.scss';

import React, { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from 'reactfire';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';
import { DashboardState, FilterParams } from './dashboard-types';
import { sendRequestWithAuth } from '../../utilities/api';
import { Item } from 'firebase/analytics';
import { useStateObject } from '../../hooks/useStateObject';
import { AxiosError } from 'axios';

const INITIAL_STATE: DashboardState = {
  items: [],
  loading: false
};

export default function Dashboard() {
  const { size } = useParams<FilterParams>();
  const pageSize = parseInt(size) || 10;
  const { showBoundary, resetBoundary } = useErrorBoundary();
  const { data: user } = useUser();
  const [state, setState] = useStateObject<DashboardState>(INITIAL_STATE);
  const { loading, items } = state;

  useEffect(() => {
    const load = async () => {
      try {
        resetBoundary();
        setState({ loading: true });

        const token = await user.getIdToken();
        const { data } = await sendRequestWithAuth<Item[]>(`/items/list`, token);

        setState({ items: data, loading: false });
      } catch (error) {
        // if there is a response object, its an axios error, otherwise, it's
        // a normal error
        setState({ loading: false, errorMessage: error.response?.data || error.message });

        if (!(error instanceof AxiosError)) {
          showBoundary(error);
        }
      }
    };

    load();
  }, [pageSize, resetBoundary, setState, showBoundary, user]);

  return (
    <section className="dashboard-page">
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
    </section>
  );
}
