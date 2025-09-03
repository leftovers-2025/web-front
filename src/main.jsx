// src/main.jsx (または src/index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// ★重要: BrowserRouter をインポートします★
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ★重要: ここでアプリケーション全体を <BrowserRouter> でラップします★ */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);