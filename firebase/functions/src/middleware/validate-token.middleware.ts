import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from '../auth';
import { logger } from 'firebase-functions/v2';
import { UserRequest } from '../core';

export async function validateToken(
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authorization.split('Bearer ')[1];
  const tokenResult = await verifyIdToken(token);
  const { valid, user } = tokenResult;

  if (!valid) {
    logger.error('Error validting authorization header:', tokenResult.error);

    return res.status(401).send(tokenResult.errorCode);
  }

  // set the user on the request
  req.user = user;
  req.uid = user.uid;

  next();
}
