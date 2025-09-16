// routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LostItemsList from '../components/pages/user/LostItemsList/LostItemsList.jsx';
import CreatePostPage from '../components/pages/teacher/CreatePost/CreatePostPage.jsx';
import GoogleLogin from '../components/pages/user/Login/Login.jsx';
import RedirectTest from '../components/pages/user/RedirectTest/RedirectTest.jsx';
import UserManagement from '../components/pages/admin/UserManagement/UserManagement.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ルート（/）から落し物一覧へリダイレクト */}
      <Route index element={<Navigate to="/lost-items" replace />} />

      {/* 落し物関連のルート */}
      <Route path="lost-items" element={<LostItemsList />} />
      <Route path="create-post" element={<CreatePostPage />} />

      {/* OAuth関連のルート */}
      <Route path="login" element={<GoogleLogin />} />
      <Route path="redirect_test" element={<RedirectTest />} />

      {/* 管理者用ユーザー管理ルート */}
      <Route path="users" element={<UserManagement />} />

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
