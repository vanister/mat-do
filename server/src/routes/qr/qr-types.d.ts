import { v4 } from 'uuid';

export type PostDependencies = {
  uuid: typeof v4;
};

export type Item = {
  id?: string;
  name: string;
  description?: string;
};
