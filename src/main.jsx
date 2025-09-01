// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 環境設定の確認 (Vite用)
if (import.meta.env.DEV) {
  console.log('🚀 落し物掲示板アプリ - 開発モードで起動中');
  console.log('API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:8080/api');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);