import React, { useEffect, useState } from 'react';
import { useItemService } from '../../hooks/useItemService';
import Title from '../Title';

import './Home.scss';

export default function Home() {
  const itemService = useItemService();
  const [item, setItem] = useState(null);

  useEffect(() => {
    itemService.post('test').then((i) => {
      setItem(i);
    });
  }, []);

  return (
    <div className="home-page">
      <Title>Home</Title>
      <p>Home</p>
      <code>{JSON.stringify(item, null, 2)}</code>
    </div>
  );
}
