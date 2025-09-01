// routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LostItemsList from '../components/pages/user/LostItemsList.jsx';

const AppRoutes = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* 簡単なヘッダー */}
      <header style={{ 
        background: 'white', 
        padding: '1rem 2rem', 
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
          📋 落し物掲示板
        </h1>
      </header>

      {/* ルーティング */}
      <Routes>
        {/* ルート（/）から落し物一覧へリダイレクト */}
        <Route index element={<Navigate to="/lost-items" replace />} />
        
        {/* 落し物関連のルート */}
        <Route path="lost-items" element={<LostItemsList />} />
        
        {/* 404エラーページ（将来実装） */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2>ページが見つかりません</h2>
            <p>お探しのページは存在しないか、移動された可能性があります。</p>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default AppRoutes;