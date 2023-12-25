export type CreateState = {
  name: string;
  description: string;
  created?: boolean;
  id?: string;
  dataUri?: string;
  errorMessage?: string;
  isLoading?: boolean;
};

export type CreatePayload = {
  dataUri: string;
  description: string;
  errorMessage: string;
  id: string;
  name: string;
};

export type CreateAction = {
  type: string;
  payload?: Partial<CreatePayload>;
};

export type CreateDispatch = Dispatch<CreateAction>;
