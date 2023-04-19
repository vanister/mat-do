import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { appSettings } from './AppSettings';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={appSettings}>
        <App />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
