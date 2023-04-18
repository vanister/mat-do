import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { ItemService } from './items/item.service';

export interface Logger {
  log(...args: any[]): void;
  error(...args: any[]): void;
}

/** A Request with user attributes from Firebase Auth. */
export type UserRequest = Request & {
  user?: DecodedIdToken;
  uid?: string;
};

/** A Request with services attributes. */
export type ServiceRequest = Request &
  UserRequest & {
    itemService: ItemService;
    // scanService: ScanService
  };
