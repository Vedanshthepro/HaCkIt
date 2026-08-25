import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { CTFProvider } from './context/CTFContext';
import './style.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <CTFProvider>
      <App />
    </CTFProvider>
  </React.StrictMode>
);
