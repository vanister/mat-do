export type DashboardState = {
  items: Item[];
  loading: boolean;
  error?: AxiosError;
};

export type DashboardAction = {
  type: string;
  payload?: Partial<DashboardState>;
};

export type FilterParams = {
  page: string;
  size: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};
