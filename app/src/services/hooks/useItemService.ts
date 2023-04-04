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
  const { user, accessToken } = useServiceDeps();

  async function list(filters: PagingFilter): Promise<Item[]> {
    const { data } = await sendRequest<Item[]>({
      url: '/items',
      accessToken
    });

    return data;
  }

  async function create(item: Partial<Item>): Promise<Item> {
    const itemWithUserId = { ...item, userId: user.sub };
    const { data: id } = await sendRequest<string>({
      url: '/items',
      method: 'POST',
      data: itemWithUserId,
      accessToken
    });

    return { ...itemWithUserId, id } as Item;
  }

  async function get(id: string): Promise<Item> {
    const { data } = await sendRequest<Item>({
      url: `/items/${id}`,
      accessToken
    });

    return data;
  }

  async function update(item: Item): Promise<void> {
    if (!item.id) {
      throw new Error('Id is required');
    }

    await sendRequest<void>({
      url: '/items',
      method: 'PUT',
      data: item,
      accessToken
    });
  }

  return {
    get,
    update,
    list,
    create
  };
}
