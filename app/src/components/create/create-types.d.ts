export type Item = {
  id: string;
  name: string;
  desc?: string;
};

export type CreateState = {
  created: boolean;
  name: string;
  desc: string;
  id: string;
  dataUri?: string;
  error?: string;
};

export type CreateAction = {
  type: string;
  payload?: Partial<CreateState>;
};
