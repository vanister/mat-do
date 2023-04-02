import React, { useEffect, useState } from 'react'
import { Item } from '../../models/item';
import { useItemService } from '../../services/hooks/useItemService';

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>();
  const itemService = useItemService();

  useEffect(() => {
    itemService.list().then(items => setItems(items));
  }, [itemService]);

  return (
    <div className="dashboard-page">
      {items?.map(item => (
        <div key={item.id} className='list-item'>
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
