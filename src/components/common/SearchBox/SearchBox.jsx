// src/components/common/SearchBox/SearchBox.jsx
import React from 'react';
import './SearchBox.css';

const SearchBox = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onReset,
  loading = false,
  placeholder = "キーワードで検索...",
  showRefreshButton = false,
  onRefresh
}) => {
  // Enterキーでの検索
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch();
    }
  };

  // 検索ボタンのクリック
  const handleSearchClick = () => {
    onSearch();
  };

  // リセットボタンのクリック
  const handleResetClick = () => {
    onReset();
  };

  // 再読み込みボタンのクリック
  const handleRefreshClick = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="search-box">
      <div className="search-box__container">
        {/* 検索入力フィールド */}
        <div className="search-box__input-group">
          <div className="search-box__input-wrapper">
            <svg 
              className="search-box__input-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              type="text"
              className="search-box__input"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="検索キーワード"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-box__clear-btn"
                onClick={() => onSearchQueryChange('')}
                disabled={loading}
                aria-label="入力をクリア"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* アクションボタン群 */}
        <div className="search-box__actions">
          {/* 検索ボタン */}
          <button
            type="button"
            className="search-box__button search-box__button--primary"
            onClick={handleSearchClick}
            disabled={loading}
            aria-label="検索実行"
          >
            {loading ? (
              <>
                <div className="search-box__spinner"></div>
                <span>検索中...</span>
              </>
            ) : (
              <>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>検索</span>
              </>
            )}
          </button>

          {/* リセットボタン */}
          <button
            type="button"
            className="search-box__button search-box__button--secondary"
            onClick={handleResetClick}
            disabled={loading}
            aria-label="検索条件をリセット"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>リセット</span>
          </button>

          {/* 再読み込みボタン（オプション） */}
          {showRefreshButton && (
            <button
              type="button"
              className="search-box__button search-box__button--refresh"
              onClick={handleRefreshClick}
              disabled={loading}
              aria-label="データを再読み込み"
              title="最新のデータを取得"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 検索のヘルプテキスト */}
      <div className="search-box__help">
        <p className="search-box__help-text">
          💡 アイテム名、場所、タグなどのキーワードで検索できます
        </p>
      </div>
    </div>
  );
};

export default SearchBox;