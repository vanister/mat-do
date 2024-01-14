import './Dashboard.scss';

import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { NavLink, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';
import { FilterParams } from './dashboard-types';
import { useApi } from '../../hooks/useApi';
import { Item } from '../../models/item';

export default function Dashboard() {
  const { size } = useParams<FilterParams>();
  const pageSize = parseInt(size) || 10;
  const { showBoundary } = useErrorBoundary();
  const { fetching, data: items, error } = useApi<Item[]>(`/items/list?pagesize=${pageSize}`);

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error, showBoundary]);

  return (
    <section className="dashboard-page">
      <Title>Dashboard</Title>
      <div className="list-container">
        {fetching ? (
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
