import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUser } from 'reactfire';
import { sendRequestWithAuth } from '../utilities/api';
import { Item } from '../models/item';
import { ItemDetailState, updateState, path } from './useItemDetails';

export default function useItemDetails(id: string) {
  const { data: user } = useUser();
  const [state, setState] = useState<ItemDetailState>({ loading: false, saving: false });
  const updateItemDetail = useMemo(() => updateState(setState), []);

  useEffect(() => {
    async function getItemDetails() {
      try {
        // setState((s) => ({ ...s, loading: true, error: null }));
        updateItemDetail({ loading: true, error: null });

        const accessToken = await user.getIdToken();
        const { data } = await sendRequestWithAuth<Item>(`${path}/${id}`, accessToken);

        // setState((s) => ({ ...s, item: data, loading: false }));
        updateItemDetail({ item: data, loading: false });
      } catch (error) {
        // setState((s) => ({ ...s, loading: false, error, item: null }));
        updateItemDetail({ loading: false, error, item: null });
      }
    }

    getItemDetails();
  }, [id, user]);

  const saveChanges = useCallback(
    async (item: Item) => {
      try {
        setState((s) => ({ ...s, saving: true }));

        const accessToken = await user.getIdToken();

        await sendRequestWithAuth<void>(path, accessToken, {
          method: 'PUT',
          data: item
        });

        setState((s) => ({
          ...s,
          saving: false,
          item: {
            ...s.item,
            name: item.name,
            description: item.description,
            found: item.found
          }
        }));
      } catch (error) {
        setState((s) => ({ ...s, saving: false, error }));
      }
    },
    [user]
  );

  return { ...state, saveChanges };
}
