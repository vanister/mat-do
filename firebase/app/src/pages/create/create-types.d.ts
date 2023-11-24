export type CreateState = {
  name: string;
  description: string;
  created?: boolean;
  id?: string;
  dataUri?: string;
  error?: string;
  isLoading?: boolean;
};

export type CreatePayload = {
  dataUri: string;
  description: string;
  errorMsg: string;
  id: string;
  name: string;
};

export type CreateAction = {
  type: string;
  payload?: Partial<CreatePayload>;
};

// todo - add CreatePayload

export type CreateDispatch = Dispatch<CreateAction>;
