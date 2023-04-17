import { Request } from 'express';
import { UnauthorizedError } from './errors/unauthorized.error';

export function getUserId(req: Request) {
  const user: { uid: string } = (req as any).user;

  if (!user) {
    throw new UnauthorizedError();
  }

  return user.uid;
}
