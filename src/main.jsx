import React from 'react';
import ReactDOM from 'react-dom/client';
import { WidgetsDataProvider } from './contexts/WidgetsContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WidgetsDataProvider>
      <App />
    </WidgetsDataProvider>
  </React.StrictMode>
);
