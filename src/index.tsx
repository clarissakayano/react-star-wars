import React, { Suspense } from 'react';

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'services/i18n';

import { VehiclesProvider } from 'context/VehiclesContext';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <VehiclesProvider>
        <App />
      </VehiclesProvider>
    </Suspense>
  </React.StrictMode>,
);
