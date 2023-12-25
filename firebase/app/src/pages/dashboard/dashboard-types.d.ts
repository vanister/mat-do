export type DashboardState = {
  items: Item[];
  loading: boolean;
  errorMessage?: string;
};

export type FilterParams = {
  page: string;
  size: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
};
