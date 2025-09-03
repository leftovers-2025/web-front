// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // ★修正: useLocation をインポート★

import MapSwitcher from './MapSwitcher';
import LostItemDetailPage from './LostItemDetailPage';

import './App.css';
import './MapSwitcher.css';

function App() {
  const location = useLocation(); // ★追加: 現在のロケーションを取得★
  const isHomePage = location.pathname === '/'; // ★追加: 現在のパスがルートパスかどうかをチェック★

  return (
    <div className="App">
      <header className="App-header">
        {/* ★修正: isHomePage が true の場合のみロゴを表示★ */}
        {isHomePage && (
          <img
            src="/KDS_logo.svg"
            alt="KDS ロゴ"
            className="kds-logo"
          />
        )}

        <Routes>
          <Route path="/" element={<MapSwitcher />} />
          <Route path="/lost-item/:id" element={<LostItemDetailPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;