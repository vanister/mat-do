import React, { useEffect, useMemo, useState } from 'react'
import { Item } from '../../models/item';
import { useItemService } from '../../services/hooks/useItemService';

import './Dashboard.scss';
import { useParams } from 'react-router-dom';

export type FilterParams = {
  page: string,
  size: string
  sortBy: string,
  sortDir: 'asc' | 'desc'
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>();
  const itemService = useItemService();
  const { size } = useParams<FilterParams>();
  const pageSize = useMemo(() => (parseInt(size) || 10), [size]);

  useEffect(() => {
    itemService.list({ size: pageSize }).then(items => setItems(items));
  }, [pageSize]);

  return (
    <div className="dashboard-page">
      {items?.map(item => (
        <div key={item.id} className="list-item">
          <p>
            {item.name}
          </p>
          <p>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
