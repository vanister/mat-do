import { useUser } from 'reactfire';
import { useEffect, useState } from 'react';
import { sendRequestWithAuth } from '../../utilities/api';
import { Item } from '../../models/item';
import { AxiosError } from 'axios';

export type ItemState = {
  items: Item[];
  loading: boolean;
  error?: AxiosError;
};

export default function useItemList(size: number) {
  const path = '/items';
  const { data: user } = useUser();
  const [itemState, setItemState] = useState<ItemState>({
    items: [],
    loading: true
  });

  useEffect(() => {
    setItemState({ items: [], loading: true });

    user
      .getIdToken()
      .then((token) => sendRequestWithAuth<Item[]>(`${path}/list`, token))
      .then((response) => {
        setItemState({ ...itemState, items: response.data });
      })
      .catch((error) => {
        setItemState({ ...itemState, error });
      })
      .finally(() => setItemState({ ...itemState, loading: false }));
  }, [size]);

  return itemState;
}
