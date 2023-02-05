import { v4 } from 'uuid';
import { ItemService } from '../../services/item.service';

export type LoggerFunction = (...msgs: string[]) => void;

export type ListDependencies = {
  itemService: ItemService;
};

export type PostDependencies = {
  uuid: typeof v4;
  logger: LoggerFunction;
};
