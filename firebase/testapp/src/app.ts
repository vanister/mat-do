import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, initializeAuth } from 'firebase/auth';
import { logWithOptions, logError, log as logVerbose } from './util';
import { getTestToken } from './token-generator';
import { TestAppArgs } from '../types';

export async function run({ verbose }: TestAppArgs) {
  try {
    const log = logWithOptions({ verbose });

    log('initializing the app...');

    const app = initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    });

    log('initializing the auth object...');

    const auth = initializeAuth(app);

    log('connecting to the emualtor...');

    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
      disableWarnings: true,
    });

    log('getting test id token...');

    const token = await getTestToken(auth, log);

    logVerbose(`id token:\n\n${token}`, '\n\n');
  } catch (error) {
    logError('error getting the test token');
    logError(error);
  }
}
