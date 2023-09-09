import admin from 'firebase-admin';

import { app } from './app';
import { Auth, DecodedIdToken } from 'firebase-admin/auth';

export type TokenVerificationResult = {
  valid: boolean;
  user?: DecodedIdToken;
  error?: Error;
  errorCode?: string;
  errorMsg?: string;
};

const defaultAuth = admin.auth(app);

export async function verifyIdToken(
  token: string,
  auth: Auth = defaultAuth
): Promise<TokenVerificationResult> {
  try {
    const decodedToken = await auth.verifyIdToken(token);

    return { valid: true, user: decodedToken };
  } catch (error) {
    return {
      valid: false,
      error,
      errorMsg: error.message,
      errorCode: error.code,
    };
  }
}
