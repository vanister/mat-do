import { v4 } from 'uuid';

export type LoggerFunction = (...msgs: string[]) => void;

export type PostDependencies = {
  uuid: typeof v4;
  logger: LoggerFunction;
};

// todo - move to models/dtos folder
export type Item = {
  id?: string;
  name: string;
  description?: string;
};
