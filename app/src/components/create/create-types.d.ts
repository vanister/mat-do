export type CreateState = {
  created: boolean;
  name: string;
  description: string;
  id?: string;
  dataUri?: string;
  error?: string;
  loading?: boolean;
};

export type CreateAction = {
  type: string;
  payload?: Partial<CreateState>;
};
