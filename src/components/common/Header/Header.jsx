import React, { useState, useEffect } from 'react';
import { FaUsers, FaPaperPlane, FaBell, FaMapMarkerAlt } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/userService.js';
import logo from '../../../assets/KDsearch_logo.svg';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ユーザー情報を取得
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
        console.log('現在のユーザー情報:', user);
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
        // エラーの場合はゲストユーザー扱い
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // 権限チェック関数
  const canAccessUserManagement = () => {
    return currentUser && currentUser.role === 'root';
  };

  const canCreatePost = () => {
    return currentUser && (currentUser.role === 'root' || currentUser.role === 'teacher');
  };

  return (
    <header className="header">
      <div className="header__content">
        {/* 左側: ロゴ */}
        <div className="header__brand">
          <div className="header__logo">
            <img 
              src={logo} 
              alt="KD Search Logo" 
              className="header__logo-img" 
            />
          </div>
        </div>
        
        {/* 右側: アイコンナビゲーション */}
        <nav className="header__nav">
          <div className="header__icons">
            {/* ユーザー管理: root権限のみ表示 */}
            {canAccessUserManagement() && (
              <button 
                className="header__icon-btn" 
                title="ユーザー管理"
                onClick={() => navigate('/users')}
              >
                <FaUsers />
              </button>
            )}
            
            {/* 投稿作成: teacher権限以上で表示 */}
            {canCreatePost() && (
              <button 
                className="header__icon-btn" 
                title="投稿作成"
                onClick={() => navigate('/create-post')}
              >
                <FaPaperPlane />
              </button>
            )}
            
            {/* 通知: 全ユーザー表示 */}
            <button 
              className="header__icon-btn" 
              title="通知"
              onClick={() => alert('通知機能は今後実装予定です')}
            >
              <FaBell />
            </button>
            
            {/* 地図表示: 全ユーザー表示 */}
            <button 
              className="header__icon-btn" 
              title="地図表示"
              onClick={() => alert('地図機能は今後実装予定です')}
            >
              <FaMapMarkerAlt />
            </button>
            
            {/* ホーム: 全ユーザー表示 */}
            <button 
              className="header__icon-btn" 
              title="ホーム"
              onClick={() => navigate('/lost-items')}
            >
              <IoHome />
            </button>
          </div>
          
          <button 
            className="header__logout-btn"
            onClick={() => navigate('/login')}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;