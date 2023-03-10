export type CreateState = {
  name: string;
  description: string;
  created?: boolean;
  id?: string;
  dataUri?: string;
  error?: string;
  loading?: boolean;
};

export type CreateAction = {
  type: string;
  payload?: Partial<CreateState>;
};

export type CreateDispatch = Dispatch<CreateAction>;
