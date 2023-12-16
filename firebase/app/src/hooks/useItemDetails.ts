import { useEffect } from 'react';
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
  const [details, setDetails] = useStateObject<ItemDetailState>({
    loading: false,
    saving: false
  });

  useEffect(() => {
    async function getItemDetails() {
      try {
        setDetails({ loading: true, error: null });

        const accessToken = await user.getIdToken();
        const { data } = await sendRequestWithAuth<Item>(`${path}/${id}`, accessToken);

        setDetails({ item: data, loading: false });
      } catch (error) {
        setDetails({ loading: false, error, item: null });
      }
    }

    getItemDetails();
  }, [id, setDetails, user]);

  async function saveChanges(item: Item) {
    try {
      setDetails({ saving: true });

      const accessToken = await user.getIdToken();

      await sendRequestWithAuth<void>(path, accessToken, {
        method: 'PUT',
        data: item
      });

      setDetails((s) => ({
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
      setDetails({ saving: false, error });
    }
  }

  return { details, saveChanges };
}
