// src/components/pages/LostItemsList/LostItemDetailModal.jsx
import React, { useEffect, useState } from 'react';
import './LostItemDetailModal.css';

const LostItemDetailModal = ({ item, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // モーダルが開かれたときに画像インデックスをリセット
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      // body スクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      // body スクロールを復元
      document.body.style.overflow = 'unset';
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // 日付フォーマット
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short'
      });
    } catch (error) {
      console.warn('日付フォーマットエラー:', error);
      return dateString;
    }
  };

  // 背景クリックでモーダルを閉じる
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 画像切り替え
  const handleImageChange = (direction) => {
    const images = item.allImages || [];
    if (images.length <= 1) return;

    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // コンタクト処理（仮実装）
  const handleContact = () => {
    alert('お問い合わせ機能は後で実装予定です');
  };

  if (!isOpen || !item) {
    return null;
  }

  const images = item.allImages && item.allImages.length > 0 ? item.allImages : [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex];

  return (
    <div 
      className="lost-item-modal__backdrop"
      onClick={handleBackdropClick}
    >
      <div className="lost-item-modal__container">
        {/* ヘッダー */}
        <div className="lost-item-modal__header">
          <h2 className="lost-item-modal__title">落し物詳細</h2>
          <button
            className="lost-item-modal__close-btn"
            onClick={onClose}
            aria-label="モーダルを閉じる"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="lost-item-modal__content">
          {/* 画像セクション */}
          <div className="lost-item-modal__image-section">
            <div className="lost-item-modal__image-container">
              {currentImage ? (
                <>
                  <img 
                    src={currentImage} 
                    alt={item.title}
                    className="lost-item-modal__image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="lost-item-modal__image-placeholder"
                    style={{ display: 'none' }}
                  >
                    <span className="lost-item-modal__image-placeholder-icon">📷</span>
                    <span>画像を読み込めませんでした</span>
                  </div>
                </>
              ) : (
                <div className="lost-item-modal__image-placeholder">
                  <span className="lost-item-modal__image-placeholder-icon">📷</span>
                  <span>画像がありません</span>
                </div>
              )}

              {/* 画像ナビゲーション */}
              {hasMultipleImages && (
                <>
                  <button
                    className="lost-item-modal__image-nav lost-item-modal__image-nav--prev"
                    onClick={() => handleImageChange('prev')}
                    aria-label="前の画像"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="lost-item-modal__image-nav lost-item-modal__image-nav--next"
                    onClick={() => handleImageChange('next')}
                    aria-label="次の画像"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 画像インジケーター */}
                  <div className="lost-item-modal__image-indicators">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`lost-item-modal__image-indicator ${
                          index === currentImageIndex ? 'lost-item-modal__image-indicator--active' : ''
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`画像 ${index + 1} を表示`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 画像数表示 */}
            {hasMultipleImages && (
              <div className="lost-item-modal__image-count">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* 詳細情報セクション */}
          <div className="lost-item-modal__details">
            {/* アイテム情報 */}
            <div className="lost-item-modal__info">
              <h3 className="lost-item-modal__item-title">{item.title}</h3>
              
              {/* 基本情報 */}
              <div className="lost-item-modal__basic-info">
                <div className="lost-item-modal__info-row">
                  <span className="lost-item-modal__info-label">
                    <span className="lost-item-modal__info-icon">🕐</span>
                    発見日時
                  </span>
                  <span className="lost-item-modal__info-value">
                    {formatDate(item.発見日時)}
                  </span>
                </div>

                {item.場所 && item.場所 !== '不明' && (
                  <div className="lost-item-modal__info-row">
                    <span className="lost-item-modal__info-label">
                      <span className="lost-item-modal__info-icon">📍</span>
                      発見場所
                    </span>
                    <span className="lost-item-modal__info-value">
                      {item.場所}
                    </span>
                  </div>
                )}

                <div className="lost-item-modal__info-row">
                  <span className="lost-item-modal__info-label">
                    <span className="lost-item-modal__info-icon">🆔</span>
                    アイテムID
                  </span>
                  <span className="lost-item-modal__info-value lost-item-modal__info-value--mono">
                    #{item.id}
                  </span>
                </div>

                {item.updatedAt && item.updatedAt !== item.発見日時 && (
                  <div className="lost-item-modal__info-row">
                    <span className="lost-item-modal__info-label">
                      <span className="lost-item-modal__info-icon">📝</span>
                      最終更新
                    </span>
                    <span className="lost-item-modal__info-value">
                      {formatDate(item.updatedAt)}
                    </span>
                  </div>
                )}
              </div>

              {/* タグ */}
              {item.タグ名 && item.タグ名.length > 0 && (
                <div className="lost-item-modal__tags-section">
                  <h4 className="lost-item-modal__section-title">
                    <span className="lost-item-modal__section-icon">🏷️</span>
                    タグ
                  </h4>
                  <div className="lost-item-modal__tags">
                    {item.タグ名.map((tag, index) => (
                      <span key={index} className="lost-item-modal__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 投稿者情報（あれば） */}
              {item.投稿者 && item.投稿者 !== '不明' && (
                <div className="lost-item-modal__reporter-section">
                  <h4 className="lost-item-modal__section-title">
                    <span className="lost-item-modal__section-icon">👤</span>
                    投稿者
                  </h4>
                  <div className="lost-item-modal__reporter">
                    {item.投稿者}
                  </div>
                </div>
              )}
            </div>

            {/* アクションボタン */}
            <div className="lost-item-modal__actions">
              <button
                className="lost-item-modal__contact-btn"
                onClick={handleContact}
              >
                <span className="lost-item-modal__contact-icon">📞</span>
                お問い合わせ
              </button>
              <button
                className="lost-item-modal__close-btn-secondary"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemDetailModal;