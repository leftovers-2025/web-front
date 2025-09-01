import React from 'react';
import './SearchBox.css';

const SearchBox = ({ 
  searchQuery, 
  selectedCategory, 
  categories,
  onSearchQueryChange,
  onCategoryChange,
  onSearch,
  onReset,
  loading = false
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && !loading) {
      onSearch();
    }
  };

  const handleReset = () => {
    if (onReset && !loading) {
      onReset();
    }
  };

  return (
    <div className={`search-box ${loading ? 'search-box--loading' : ''}`}>
      <form onSubmit={handleSubmit} className="search-box__form">
        <div className="search-box__grid">
          {/* 検索キーワード */}
          <div className="search-box__group">
            <label htmlFor="search" className="search-box__label">
              キーワード検索
            </label>
            <input
              type="text"
              id="search"
              className="search-box__input"
              value={searchQuery || ''}
              onChange={(e) => onSearchQueryChange && onSearchQueryChange(e.target.value)}
              placeholder="アイテム名、タグ、投稿者で検索..."
              disabled={loading}
            />
          </div>

          {/* カテゴリ選択 */}
          <div className="search-box__group">
            <label htmlFor="category" className="search-box__label">
              カテゴリ（タグ検索）
            </label>
            <select
              id="category"
              className="search-box__select"
              value={selectedCategory || ''}
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
              disabled={loading}
            >
              {categories && categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ボタン */}
        <div className="search-box__buttons">
          <button
            type="submit"
            className="search-box__btn search-box__btn--primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span style={{ 
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}>
                </span>
                検索中...
              </>
            ) : (
              <>🔍 検索</>
            )}
          </button>
          <button
            type="button"
            className="search-box__btn search-box__btn--secondary"
            onClick={handleReset}
            disabled={loading}
          >
            ↻ リセット
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;