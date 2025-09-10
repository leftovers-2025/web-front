// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 環境変数の必須チェック
if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  throw new Error('Environment variable VITE_API_URL is required');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
