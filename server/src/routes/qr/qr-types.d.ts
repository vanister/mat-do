import { v4 } from 'uuid';

export type LoggerFunction = (...msgs: string[]) => void;

export type PostDependencies = {
  uuid: typeof v4;
  logger: LoggerFunction;
};

export type Item = {
  id?: string;
  name: string;
  description?: string;
};
