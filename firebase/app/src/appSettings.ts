import { FirebaseOptions } from 'firebase/app';

export type AppSettings = {
  baseUrl: string;
  isProduction: boolean;
  firebaseOptions: FirebaseOptions;
};

export const appSettings: AppSettings = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  isProduction: process.env.NODE_ENV === 'production',
  firebaseOptions: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  }
};
