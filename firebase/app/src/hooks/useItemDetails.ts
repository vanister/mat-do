import { useCallback, useEffect } from 'react';
import { useUser } from 'reactfire';
import { sendRequestWithAuth } from '../utilities/api';
import { Item } from '../models/item';
import { AxiosError } from 'axios';
import { useStateObject } from './useStateObject';

const path = '/items';

export type ItemDetailState = {
  item?: Item;
  loading: boolean;
  saving: boolean;
  error?: Error | AxiosError;
};

export default function useItemDetails(id: string) {
  const { data: user } = useUser();
  const { state, setState } = useStateObject<ItemDetailState>({ loading: false, saving: false });

  useEffect(() => {
    async function getItemDetails() {
      try {
        setState({ loading: true, error: null });

        const accessToken = await user.getIdToken();
        const { data } = await sendRequestWithAuth<Item>(`${path}/${id}`, accessToken);

        setState({ item: data, loading: false });
      } catch (error) {
        setState({ loading: false, error, item: null });
      }
    }

    getItemDetails();
  }, [id, setState, user]);

  const saveChanges = useCallback(
    async (item: Item) => {
      try {
        setState({ saving: true });

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
        setState({ saving: false, error });
      }
    },
    [setState, user]
  );

  return { ...state, saveChanges };
}
