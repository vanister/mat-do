import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import FirebaseProvider from './contexts/FirebaseContext';
import { appSettings } from './AppSettings';
import App from './App';

import './index.scss';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider appSettings={appSettings} useEmulator={true}>
        <FirebaseAuthProvider>
          <App />
        </FirebaseAuthProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
