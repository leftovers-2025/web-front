// routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LostItemsList from '../components/pages/user/LostItemsList/LostItemsList.jsx';
import GoogleLogin from '../components/pages/user/Login/Login.jsx';

import MapSwitcher from '../MapSwitcher.jsx';
// LostItemDetailPage コンポーネントをインポート
import LostItemDetailPage from '../LostItemDetailPage.jsx';

import Redirect_home from '../components/pages/user/redirect_home/redirect_home.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 以下の変更箇所: */}
      {/* 最初のルート（/）でMapSwitcherを直接レンダリング */}
      <Route path="/" element={<LostItemsList />} />
      
      {/* 落し物関連のルート */}
      <Route path="lost-items" element={<LostItemsList />} />
      <Route path="GoogleLogin" element={<GoogleLogin />} />
      <Route path="Redirect_home" element={<Redirect_home />} />

      
      {/* 落とし物の詳細ページへの新しいルートを追加 */}
      {/* :id はURL内の動的なパラメータを表します */}
      <Route path="lost-item/:id" element={<LostItemDetailPage />} />
      
      {/* MapSwitcher のルートは不要になります（上記のルートで表示するため） */}
      {<Route path="map-switcher" element={<MapSwitcher />} />}

      {/* 404エラーページ */}
      <Route path="*" element={
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>
            ページが見つかりません
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            お探しのページは存在しないか、移動された可能性があります。
          </p>
          <a 
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            ホームに戻る
          </a>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;