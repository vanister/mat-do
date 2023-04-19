import { useUser } from 'reactfire';
import { Item } from '../../models/item';
import { sendRequestWithAuth } from '../../utilities/api';

export type PagingFilter = {
  size: number;
  page: number;
  total: number;
};

export interface ItemService {
  /**
   * Gets and item by its id.
   *
   * @param id The Id of the item to get.
   */
  get(id: string): Promise<Item>;

  /**
   * Updates the given item.
   *
   * @param item The item to update.
   */
  update(item: Item): Promise<void>;

  /**
   * Gets a list of Items belonging to the current authenticated user.
   *
   * @param filters The paging filters.
   */
  list(filters: Partial<PagingFilter>): Promise<Item[]>;

  /**
   * Creates a new item by sending a POST request to the server.
   *
   * @param item The item to create on the server.
   */
  create(item: Partial<Item>): Promise<Item>;
}

export function useItemService(): ItemService {
  const path = '/items';
  const { data: user } = useUser();

  async function list(filters: PagingFilter): Promise<Item[]> {
    const accessToken = await user.getIdToken();
    const { data } = await sendRequestWithAuth<Item[]>(
      `${path}/list`,
      accessToken,
      {
        params: { userId: user.uid }
      }
    );

    return data;
  }

  async function create(item: Partial<Item>): Promise<Item> {
    const accessToken = await user.getIdToken();
    const itemWithUserId = { ...item, userId: user.uid };
    const { data: id } = await sendRequestWithAuth<string>(path, accessToken, {
      method: 'POST',
      data: itemWithUserId
    });

    return { ...itemWithUserId, id } as Item;
  }

  async function get(id: string): Promise<Item> {
    const accessToken = await user.getIdToken();
    const { data } = await sendRequestWithAuth<Item>(
      `${path}/${id}`,
      accessToken
    );

    return data;
  }

  async function update(item: Item): Promise<void> {
    const accessToken = await user.getIdToken();

    await sendRequestWithAuth<void>(path, accessToken, {
      method: 'PUT',
      data: item
    });
  }

  return {
    get,
    update,
    list,
    create
  };
}
