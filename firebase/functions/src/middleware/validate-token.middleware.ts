import { Request, Response, NextFunction } from 'express';
import { verifyIdToken } from '../auth';
import { logger } from 'firebase-functions/v2';

export async function validateToken(
  req: Request,
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
    logger.error('Error validting authorization header', tokenResult.error);

    return res.sendStatus(401);
  }

  // set the user on the request
  // @ts-ignore
  req.user = user;
  // @ts-ignore
  req.uid = user.uid;

  next();
}
