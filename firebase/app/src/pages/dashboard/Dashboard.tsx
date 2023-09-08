import React, { useEffect, useMemo, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { Item } from '../../models/item';
import { useItemService } from '../../hooks/services/useItemService';
import { NavLink, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import Loading from '../../components/loading/Loading';

import './Dashboard.scss';

export type FilterParams = {
  page: string;
  size: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>();
  const [isLoading, setIsLoading] = useState(true);
  const itemService = useItemService();
  const { size } = useParams<FilterParams>();
  const pageSize = useMemo(() => parseInt(size) || 10, [size]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    itemService
      .list({ size: pageSize })
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        showBoundary(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageSize]);

  return (
    <div className="dashboard-page">
      <Title>Dashboard</Title>
      <div className="list-container">
        {isLoading && <Loading />}
        {!isLoading && (
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
