import './Dashboard.scss';

import React from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { NavLink, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';
import useItemList from './useItemList';

export type FilterParams = {
  page: string;
  size: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};

export default function Dashboard() {
  const { size } = useParams<FilterParams>();
  const pageSize = parseInt(size) || 10;
  const { showBoundary } = useErrorBoundary();
  const { items, loading, error } = useItemList(pageSize);

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
