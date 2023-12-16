import { AxiosError } from 'axios';

export type DashboardState = {
  items: Item[];
  loading: boolean;
  error?: AxiosError;
};

export type DashboardPayload = {
  items: Item[];
  error: AxiosError;
};

export type DashboardAction = {
  type: string;
  payload?: Partial<DashboardPayload>;
};

export type FilterParams = {
  page: string;
  size: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};
