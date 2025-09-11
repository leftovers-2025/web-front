// src/components/pages/teacher/CreatePost/TagSelector.jsx
import React, { useState, useEffect, useRef } from 'react';
import './TagSelector.css';

const TagSelector = ({ tags, selectedTagIds, onClose, onTagsSelect }) => {
  const [currentSelectedIds, setCurrentSelectedIds] = useState([...selectedTagIds]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState(tags);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // 検索フィルタリング
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTags(tags);
    } else {
      const filtered = tags.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTags(filtered);
    }
  }, [searchQuery, tags]);

  // フォーカス設定
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // ESCキーでクローズ
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // モーダル外クリックでクローズ
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // タグ選択切り替え
  const toggleTag = (tagId) => {
    setCurrentSelectedIds(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // 全選択/全解除
  const handleSelectAll = () => {
    if (currentSelectedIds.length === filteredTags.length) {
      // 全解除
      setCurrentSelectedIds([]);
    } else {
      // 全選択（現在表示されているタグのみ）
      setCurrentSelectedIds(filteredTags.map(tag => tag.id));
    }
  };

  // 決定ボタン
  const handleConfirm = () => {
    onTagsSelect(currentSelectedIds);
  };

  // キャンセルボタン
  const handleCancel = () => {
    onClose();
  };

  // 検索クリア
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="tag-selector-overlay" onClick={handleBackdropClick}>
      <div className="tag-selector" ref={modalRef}>
        <div className="tag-selector__header">
          <h3 className="tag-selector__title">タグを選択</h3>
          <button
            type="button"
            className="tag-selector__close-button"
            onClick={onClose}
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        <div className="tag-selector__search-section">
          <div className="tag-selector__search-box">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="タグを検索..."
              className="tag-selector__search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="tag-selector__search-clear"
                onClick={clearSearch}
                aria-label="検索をクリア"
              >
                ✕
              </button>
            )}
          </div>

          <div className="tag-selector__actions">
            <button
              type="button"
              className="tag-selector__select-all-button"
              onClick={handleSelectAll}
            >
              {currentSelectedIds.length === filteredTags.length ? '全解除' : '全選択'}
            </button>
            <span className="tag-selector__count">
              {currentSelectedIds.length} / {filteredTags.length} 選択中
            </span>
          </div>
        </div>

        <div className="tag-selector__content">
          {filteredTags.length === 0 ? (
            <div className="tag-selector__empty">
              <div className="tag-selector__empty-icon">🔍</div>
              <p className="tag-selector__empty-message">
                {searchQuery ? 
                  `「${searchQuery}」に一致するタグが見つかりませんでした` : 
                  'タグがありません'
                }
              </p>
            </div>
          ) : (
            <div className="tag-selector__tags">
              {filteredTags.map(tag => (
                <label
                  key={tag.id}
                  className={`tag-selector__tag ${
                    currentSelectedIds.includes(tag.id) ? 'tag-selector__tag--selected' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={currentSelectedIds.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                    className="tag-selector__checkbox"
                  />
                  <span className="tag-selector__tag-text">
                    {tag.name}
                  </span>
                  <span className="tag-selector__checkmark">
                    ✓
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="tag-selector__footer">
          <button
            type="button"
            className="tag-selector__cancel-button"
            onClick={handleCancel}
          >
            キャンセル
          </button>
          <button
            type="button"
            className="tag-selector__confirm-button"
            onClick={handleConfirm}
            disabled={currentSelectedIds.length === 0}
          >
            決定 ({currentSelectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSelector;