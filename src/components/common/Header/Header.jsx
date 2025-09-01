import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          📋 落し物掲示板
        </h1>
        
        <nav className="header__nav">
          <a href="#" className="header__nav-link header__nav-link--active">
            落し物一覧
          </a>
          <a href="#" className="header__nav-link">
            マイページ
          </a>
          <button 
            className="header__register-btn"
            onClick={() => alert('落し物登録機能は後で実装予定')}
            title="新しい落し物を登録"
          >
            + 落し物を登録
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;