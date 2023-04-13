import { Item } from '../../models/item';
import { sendRequest } from '../../utilities/api';
import { useServiceDeps } from './useServiceDependencies';

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
  const { user, accessToken } = useServiceDeps();

  async function list(filters: PagingFilter): Promise<Item[]> {
    const { data } = await sendRequest<Item[]>(`${path}/list`, accessToken, {
      params: { userId: user.sub }
    });

    return data;
  }

  async function create(item: Partial<Item>): Promise<Item> {
    const itemWithUserId = { ...item, userId: user.sub };
    const { data: id } = await sendRequest<string>(path, accessToken, {
      method: 'POST',
      data: itemWithUserId
    });

    return { ...itemWithUserId, id } as Item;
  }

  async function get(id: string): Promise<Item> {
    const { data } = await sendRequest<Item>(`${path}/${id}`, accessToken);

    return data;
  }

  async function update(item: Item): Promise<void> {
    await sendRequest<void>(path, accessToken, {
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
